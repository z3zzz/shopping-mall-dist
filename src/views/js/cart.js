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
const productsCount = document.querySelector('#productsCount');
const productsTotal = document.querySelector('#productsTotal');
const deliveryFee = document.querySelector('#deliveryFee');
const orderTotal = document.querySelector('#orderTotal');
const purchaseButton = document.querySelector('#purchaseButton');

checkLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertProductsfromCart();
  checkAllSelectCheckbox();
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
  const orderSummary = await getFromDb('order', 'summary');
  const selectedIds = orderSummary.selectedIds;

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
              <button class="button is-rounded" id="minus-${_id}">
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
              <button class="button is-rounded" id="plus-${_id}">
                <span class="icon">
                  <i class="fas fa-lg fa-plus"></i>
                </span>
              </button>
            </div>
          </div>
          <div class="calculation">
            <p>${numberWithCommas(price)}원</p>
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
  });
}

async function toggleAll(e) {
  // 전체 체크냐 전체 체크 해제이냐를 가져옴
  const isChecked = e.target.checked;
  const { ids, selectedIds } = await getFromDb('order', 'summary');

  ids.forEach(async (id) => {
    // 체크박스를 체크 혹은 언체크함.
    document.querySelector(`#checkbox-${id}`).checked = isChecked;

    // 결제정보 업데이트
    if (isChecked && !selectedIds.includes(id)) {
      updateOrderSummary(id, 'add');
    }
  });

  if (!isChecked) {
    // 결제정보 업데이트
    productsCount.innerText = `0개`;
    productsTotal.innerText = `0원`;
    deliveryFee.innerText = `0원`;
    orderTotal.innerText = `0원`;

    // indexedDB의 order.summary 업데이트
    await putToDb('order', 'summary', (data) => {
      data.selectedIds = [];
      data.productsCount = 0;
      data.productsTotal = 0;
    });
  }
}

async function deleteSelectedItems() {
  const { selectedIds } = await getFromDb('order', 'summary');

  selectedIds.forEach((id) => deleteItem(id));
}

async function checkAllSelectCheckbox() {
  const orderSummary = await getFromDb('order', 'summary');
  const ids = orderSummary.ids;
  const selectedIds = orderSummary.selectedIds;

  // 장바구니 아이템 수가 0이 아니고, 또 전체 선택이라면 체크함.
  if (ids.length && ids.length === selectedIds.length) {
    allSelectCheckbox.checked = true;
  } else {
    allSelectCheckbox.checked = false;
  }
}

async function deleteItem(id) {
  // indexedDB의 cart 목록에서 id를 key로 가지는 데이터를 삭제함.
  await deleteFromDb('cart', id);

  // 결제정보를 업데이트함.
  await updateOrderSummary(id, 'remove');

  // 제품 요소(컴포넌트)를 페이지에서 제거함
  document.querySelector(`#productItem-${id}`).remove();
}

async function updateOrderSummary(id, type) {
  // 데이터 수정에 필요한 값들을 가져옴.
  const priceString = document.querySelector(`#total-${id}`).innerText;
  const price = getNumbers(priceString);

  const priceUpdate = type === 'add' ? +price : -price;
  const countUpdate = type === 'add' ? +1 : -1;

  const currentCount = getNumbers(productsCount.innerText);
  const currentProductsTotal = getNumbers(productsTotal.innerText);
  const currentFee = getNumbers(deliveryFee.innerText);
  const currentOrderTotal = getNumbers(orderTotal.innerText);

  // 결제정보 업데이트
  productsCount.innerText = `${currentCount + countUpdate}개`;
  productsTotal.innerText = `${numberWithCommas(
    currentProductsTotal + priceUpdate
  )}원`;

  if (type === 'add' && currentFee === 0) {
    deliveryFee.innerText = `3000원`;
    orderTotal.innerText = `${numberWithCommas(
      currentOrderTotal + priceUpdate + 3000
    )}원`;
  } else {
    orderTotal.innerText = `${numberWithCommas(
      currentOrderTotal + priceUpdate
    )}원`;
  }

  // 이 업데이트로 인해 장바구니가 비게 되는 경우
  if (type === 'remove' && currentCount === 1) {
    deliveryFee.innerText = `0원`;

    // 다시 한 번, 현재 값을 가져와서 3000을 빼 줌
    const currentOrderTotal = getNumbers(orderTotal.innerText);
    orderTotal.innerText = `${numberWithCommas(currentOrderTotal - 3000)}원`;

    // 전체선택도 언체크되도록 함.
    checkAllSelectCheckbox();
  }

  // indexedDB의 order.summary 업데이트
  await putToDb('order', 'summary', (data) => {
    if (type === 'add' && !data.ids.includes(id)) {
      data.ids.push(id);
    }

    if (type === 'add' && !data.selectedIds.includes(id)) {
      data.selectedIds.push(id);
    }

    if (type === 'remove') {
      data.ids = data.ids.filter((_id) => _id !== id);
      data.selectedIds = data.selectedIds.filter((_id) => _id !== id);
    }

    data.productsCount += countUpdate;
    data.productsTotal += priceUpdate;
  });
}
