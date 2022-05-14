import { getImageUrl } from './common/aws-s3.js';
import * as Api from './common/api.js';
import {
  checkLogin,
  doLogout,
  numberWithCommas,
  getNumbers,
} from './common/useful-functions.js';
import { deleteFromDb, getFromDb, putToDb } from './common/indexed-db.js';

// 요소(element), input 혹은 상수
const logoutTag = document.querySelector('#logoutTag');
const cartProductsContainer = document.querySelector('#cartProductsContainer');
const allSelectCheckbox = document.querySelector('#allSelectCheckbox');
const partialDeleteLabel = document.querySelector('#partialDeleteLabel');
const productsCountElem = document.querySelector('#productsCount');
const productsTotalElem = document.querySelector('#productsTotal');
const deliveryFeeElem = document.querySelector('#deliveryFee');
const orderTotalElem = document.querySelector('#orderTotal');
const purchaseButton = document.querySelector('#purchaseButton');

checkLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertProductsfromCart();
  insertOrderSummary();
  updateAllSelectCheckbox();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutTag.addEventListener('click', doLogout);
  allSelectCheckbox.addEventListener('change', toggleAll);
  partialDeleteLabel.addEventListener('click', deleteSelectedItems);
}

// indexedDB의 cart와 order에서 필요한 정보를 가져온 후
// 요소(컴포넌트)를 만들어 html에 삽입함.
async function insertProductsfromCart() {
  const products = await getFromDb('cart');
  const { selectedIds } = await getFromDb('order', 'summary');

  products.forEach(async (product) => {
    // 객체 destructuring
    const { _id, title, quantity, imageKey, price } = product;
    const imageUrl = await getImageUrl(imageKey);

    const isSelected = selectedIds.includes(_id);

    cartProductsContainer.insertAdjacentHTML(
      'beforeend',
      `
        <div class="cart-product-item" id="productItem-${_id}">
          <label class="checkbox">
            <input type="checkbox" id="checkbox-${_id}" ${
        isSelected ? 'checked' : ''
      } />
          </label>
          <button class="delete-button" id="delete-${_id}">
            <span class="icon">
              <i class="fas fa-x"></i>
            </span>
          </button>
          <figure class="image is-96x96">
            <img
              src="#temp"
              alt="product-image"
            />
          </figure>
          <div class="content">
            <p>${title}</p>
            <div class="quantity">
              <button 
                class="button is-rounded" 
                id="minus-${_id}" 
                ${quantity <= 1 ? 'disabled' : ''}
              >
                <span class="icon is-small">
                  <i class="fas fa-thin fa-minus"></i>
                </span>
              </button>
              <input
                class="input"
                id="quantityInput-${_id}"
                type="number"
                min="1"
                max="99"
                value="${quantity}"
              />
              <button 
                class="button is-rounded" 
                id="plus-${_id}"
                ${quantity >= 99 ? 'disabled' : ''}
              >
                <span class="icon">
                  <i class="fas fa-lg fa-plus"></i>
                </span>
              </button>
            </div>
          </div>
          <div class="calculation">
            <p id="unitPrice-${_id}">${numberWithCommas(price)}원</p>
            <p>
              <span class="icon">
                <i class="fas fa-thin fa-xmark"></i>
              </span>
            </p>
            <p id="quantity-${_id}">${quantity}</p>
            <p>
              <span class="icon">
                <i class="fas fa-thin fa-equals"></i>
              </span>
            </p>
            <p id="total-${_id}">${numberWithCommas(quantity * price)}원</p>
          </div>
        </div>
      `
    );

    // 각종 이벤트 추가
    document
      .querySelector(`#delete-${_id}`)
      .addEventListener('click', () => deleteItem(_id));

    document
      .querySelector(`#checkbox-${_id}`)
      .addEventListener('change', () => toggleItem(_id));

    document
      .querySelector(`#plus-${_id}`)
      .addEventListener('click', () => increaseItem(_id));

    document
      .querySelector(`#minus-${_id}`)
      .addEventListener('click', () => decreaseItem(_id));

    document
      .querySelector(`#quantityInput-${_id}`)
      .addEventListener('change', () => inputItem(_id));
  });
}

async function toggleItem(id) {
  const itemCheckbox = document.querySelector(`#checkbox-${id}`);
  const isChecked = itemCheckbox.checked;

  // 결제정보 업데이트 및, 체크 상태에서는 수정 가능 (언체크는 불가능)으로 함
  if (isChecked) {
    await updateOrderSummary(id, 'add-checkbox');
    enableChange(id);
  } else {
    await updateOrderSummary(id, 'removeTemp-checkbox');
    disableChange(id);
  }
}

async function toggleAll(e) {
  // 전체 체크냐 전체 체크 해제이냐로 true 혹은 false
  const isCheckAll = e.target.checked;
  const { ids } = await getFromDb('order', 'summary');

  ids.forEach(async (id) => {
    const itemCheckbox = document.querySelector(`#checkbox-${id}`);
    const isItemCurrentlyChecked = itemCheckbox.checked;

    // 일단 아이템(제품) 체크박스에 전체 체크 혹은 언체크 여부를 반영함.
    itemCheckbox.checked = isCheckAll;

    // 결제정보 업데이트 필요 여부 확인
    const isAddRequired = isCheckAll && !isItemCurrentlyChecked;
    const isRemoveRequired = !isCheckAll && isItemCurrentlyChecked;

    // 결제정보 업데이트 및, 체크 상태에서는 수정 가능으로 함
    if (isAddRequired) {
      updateOrderSummary(id, 'add-checkbox');
      enableChange(id);
    }

    // 결제정보 업데이트 및, 언체크 상태에서는 수정 불가능으로 함
    if (isRemoveRequired) {
      updateOrderSummary(id, 'removeTemp-checkbox');
      disableChange(id);
    }
  });
}

async function increaseItem(id) {
  // 결제정보카드 업데이트
  await updateOrderSummary(id, 'add-plusButton');

  // 제품아이템카드 업데이트
  await updateProductItem(id, 'increase');

  // indexedDB의 cart 데이터 업데이트
  await putToDb('cart', id, (data) => {
    data.quantity = data.quantity + 1;
  });

  // input 박스 숫자 업데이트
  const quantityInput = document.querySelector(`#quantityInput-${id}`);
  const currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;

  // 숫자가 98이었다면, 이제 99이므로, + 버튼 못누르게 함.
  if (currentQuantity === 98) {
    const plusButton = document.querySelector(`#plus-${id}`);
    plusButton.setAttribute('disabled', '');
  }

  // + 버튼 누를 시, -버튼은 최소 1번은 누를 수 있는 상황이 됨.
  const minusButton = document.querySelector(`#minus-${id}`);
  minusButton.removeAttribute('disabled');
}

async function decreaseItem(id) {
  // 결제정보카드 업데이트
  await updateOrderSummary(id, 'minusButton');

  // 제품아이템카드 업데이트
  await updateProductItem(id, 'decrease');

  // indexedDB의 cart 데이터 업데이트
  await putToDb('cart', id, (data) => {
    data.quantity = data.quantity - 1;
  });

  // input 박스 숫자 업데이트
  const quantityInput = document.querySelector(`#quantityInput-${id}`);
  const currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity - 1;

  // 숫자가 2였다면, 이제 1이므로, - 버튼 못누르게 함.
  if (currentQuantity === 2) {
    const minusButton = document.querySelector(`#minus-${id}`);
    minusButton.setAttribute('disabled', '');
  }

  // - 버튼 누를 시, +버튼은 최소 1번은 누를 수 있는 상황이 됨.
  const plusButton = document.querySelector(`#plus-${id}`);
  plusButton.removeAttribute('disabled');
}

async function inputItem(id) {
  // 우선 입력값이 범위 1~99 인지 확인
  const inputElem = document.querySelector(`#quantityInput-${id}`);
  const quantity = parseInt(inputElem.value);

  if (quantity < 1 || quantity > 99) {
    return alert('수량은 1~99 사이가 가능합니다.');
  }

  // 결제정보카드 업데이트
  await updateOrderSummary(id, 'add-input');

  // 제품아이템카드 업데이트
  await updateProductItem(id, 'input');

  // indexedDB의 cart 데이터 업데이트
  await putToDb('cart', id, (data) => {
    data.quantity = quantity;
  });

  const minusButton = document.querySelector(`#minus-${id}`);
  const plusButton = document.querySelector(`#plus-${id}`);

  // 숫자가 1이라면, - 버튼 못누르게 함.
  if (quantity === 1) {
    minusButton.setAttribute('disabled', '');
    return;
  }

  // 숫자가 99라면, + 버튼 못누르게 함.
  if (quantity === 99) {
    plusButton.setAttribute('disabled', '');
    return;
  }

  // 이제 숫자가 2~98 사이이므로, -, + 버튼을 누를 수 있음.
  minusButton.removeAttribute('disabled');
  plusButton.removeAttribute('disabled');
}

async function deleteSelectedItems() {
  const { selectedIds } = await getFromDb('order', 'summary');

  selectedIds.forEach((id) => deleteItem(id));
}

async function updateAllSelectCheckbox() {
  const { ids, selectedIds } = await getFromDb('order', 'summary');

  const isOrderEmpty = ids.length === 0;
  const isAllItemSelected = ids.length === selectedIds.length;

  // 장바구니 아이템(제품) 수가 0이 아니고,
  // 또 전체 아이템들이 선택된 상태라면 체크함.
  if (!isOrderEmpty && isAllItemSelected) {
    allSelectCheckbox.checked = true;
  } else {
    allSelectCheckbox.checked = false;
  }
}

async function deleteItem(id) {
  // indexedDB의 cart 목록에서 id를 key로 가지는 데이터를 삭제함.
  await deleteFromDb('cart', id);

  // 결제정보를 업데이트함.
  await updateOrderSummary(id, 'removePermanent-deleteButton');

  // 제품 요소(컴포넌트)를 페이지에서 제거함
  document.querySelector(`#productItem-${id}`).remove();

  // 전체선택 체크박스를 업데이트함
  updateAllSelectCheckbox();
}

async function updateOrderSummary(id, type) {
  // 업데이트 방식 결정을 위한 변수들
  const isCheckbox = type.includes('checkbox');
  const isInput = type.includes('input');
  const isDeleteButton = type.includes('deleteButton');
  const isMinusButton = type.includes('minusButton');
  const isPlusButton = type.includes('plusButton');
  const isAdd = type.includes('add');
  const isRemoveTemp = type.includes('removeTemp');
  const isRemovePermanent = type.includes('removePermanent');
  const isRemove = isRemoveTemp || isRemovePermanent;

  // 업데이트에 사용될 변수
  let price;
  let quantity;

  // 체크박스 혹은 삭제 버튼 클릭으로 인한 업데이트임.
  if (isCheckbox || isDeleteButton) {
    const priceElem = document.querySelector(`#total-${id}`);
    price = getNumbers(priceElem.innerText);

    quantity = 1;
  }

  // - + 버튼 클릭으로 인한 업데이트임.
  if (isMinusButton || isPlusButton) {
    const unitPriceElem = document.querySelector(`#unitPrice-${id}`);
    price = getNumbers(unitPriceElem.innerText);

    quantity = 0;
  }

  // input 박스 입력으로 인한 업데이트임
  if (isInput) {
    const unitPriceElem = document.querySelector(`#unitPrice-${id}`);
    const unitPrice = getNumbers(unitPriceElem.innerText);

    const inputElem = document.querySelector(`#quantityInput-${id}`);
    const inputQuantity = getNumbers(inputElem.value);

    const quantityElem = document.querySelector(`#quantity-${id}`);
    const currentQuantity = getNumbers(quantityElem.innerText);

    price = unitPrice * (inputQuantity - currentQuantity);

    quantity = 0;
  }

  // 업데이트 방식
  const priceUpdate = isAdd ? +price : -price;
  const countUpdate = isAdd ? +quantity : -quantity;

  // 현재 결제정보의 값들을 가져오고 숫자로 바꿈.
  const currentCount = getNumbers(productsCountElem.innerText);
  const currentProductsTotal = getNumbers(productsTotalElem.innerText);
  const currentFee = getNumbers(deliveryFeeElem.innerText);
  const currentOrderTotal = getNumbers(orderTotalElem.innerText);

  // 결제정보 관련 요소들 업데이트
  productsCountElem.innerText = `${currentCount + countUpdate}개`;
  productsTotalElem.innerText = `${numberWithCommas(
    currentProductsTotal + priceUpdate
  )}원`;

  // 기존 결제정보가 비어있었어서, 배송비 또한 0인 상태였던 경우
  const isFeeAddRequired = isAdd && currentFee === 0;

  if (isFeeAddRequired) {
    deliveryFeeElem.innerText = `3000원`;
    orderTotalElem.innerText = `${numberWithCommas(
      currentOrderTotal + priceUpdate + 3000
    )}원`;
  } else {
    orderTotalElem.innerText = `${numberWithCommas(
      currentOrderTotal + priceUpdate
    )}원`;
  }

  // 이 업데이트로 인해 결제정보가 비게 되는 경우
  const isCartNowEmpty = currentCount === 1 && isRemove;

  if (isCartNowEmpty) {
    deliveryFeeElem.innerText = `0원`;

    // 다시 한 번, 현재 값을 가져와서 3000을 빼 줌
    const currentOrderTotal = getNumbers(orderTotalElem.innerText);
    orderTotalElem.innerText = `${numberWithCommas(
      currentOrderTotal - 3000
    )}원`;

    // 전체선택도 언체크되도록 함.
    updateAllSelectCheckbox();
  }

  // indexedDB의 order.summary 업데이트
  await putToDb('order', 'summary', (data) => {
    const hasId = data.selectedIds.includes(id);

    if (isAdd && !hasId) {
      data.selectedIds.push(id);
    }

    if (isRemoveTemp) {
      data.selectedIds = data.selectedIds.filter((_id) => _id !== id);
    }

    if (isRemovePermanent) {
      data.ids = data.ids.filter((_id) => _id !== id);
      data.selectedIds = data.selectedIds.filter((_id) => _id !== id);
    }

    data.productsCount += countUpdate;
    data.productsTotal += priceUpdate;
  });

  // 전체선택 체크박스 업데이트
  updateAllSelectCheckbox();
}

async function updateProductItem(id, type) {
  // 업데이트 방식을 결정하는 변수들
  const isInput = type.includes('input');
  const isIncrease = type.includes('increase');

  // 업데이트에 필요한 요소 및 값들을 가져오고 숫자로 바꿈.
  const unitPriceElem = document.querySelector(`#unitPrice-${id}`);
  const unitPrice = getNumbers(unitPriceElem.innerText);

  const quantityElem = document.querySelector(`#quantity-${id}`);
  const currentQuantity = getNumbers(quantityElem.innerText);

  const totalElem = document.querySelector(`#total-${id}`);
  const currentTotal = getNumbers(totalElem.innerText);

  const inputElem = document.querySelector(`#quantityInput-${id}`);
  const inputQuantity = getNumbers(inputElem.value);

  // 업데이트 진행
  if (isInput) {
    quantityElem.innerText = `${inputQuantity}개`;
    totalElem.innerText = `${numberWithCommas(unitPrice * inputQuantity)}원`;
    return;
  }

  const quantityUpdate = isIncrease ? +1 : -1;
  const priceUpdate = isIncrease ? +price : -price;

  quantityElem.innerText = `${currentQuantity + quantityUpdate}개`;
  totalElem.innerText = `${numberWithCommas(currentTotal + priceUpdate)}원`;
}

function disableChange(id) {
  const minusButton = document.querySelector(`#minus-${id}`);
  const quantityInput = document.querySelector(`#quantityInput-${id}`);
  const plusButton = document.querySelector(`#plus-${id}`);

  minusButton.setAttribute('disabled', '');
  quantityInput.setAttribute('disabled', '');
  plusButton.setAttribute('disabled', '');
}

function enableChange(id) {
  const minusButton = document.querySelector(`#minus-${id}`);
  const quantityInput = document.querySelector(`#quantityInput-${id}`);
  const plusButton = document.querySelector(`#plus-${id}`);

  minusButton.removeAttribute('disabled');
  quantityInput.removeAttribute('disabled');
  plusButton.removeAttribute('disabled');
}

async function insertOrderSummary() {
  const { productsCount, productsTotal } = await getFromDb('order', 'summary');

  productsCountElem.innerText = `${productsCount}개`;
  productsTotalElem.innerText = `${numberWithCommas(productsTotal)}원`;
  deliveryFeeElem.innerText = `3,000원`;
  orderTotalElem.innerText = `${numberWithCommas(productsTotal + 3000)}원`;
}
