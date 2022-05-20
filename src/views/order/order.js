import * as Api from '/api.js';
import {
  checkLogin,
  doLogout,
  addCommas,
  convertToNumber,
  navigate,
  compressString,
} from '/useful-functions.js';
import { deleteFromDb, getFromDb, putToDb } from '/indexed-db.js';

// 요소(element), input 혹은 상수
const logoutTag = document.querySelector('#logoutTag');
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const postalCodeInput = document.querySelector('#postalCode');
const searchAddressButton = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBox = document.querySelector('#requestSelectBox');
const customRequestContainer = document.querySelector(
  '#customRequestContainer'
);
const customRequestInput = document.querySelector('#customRequest');
const productsTitleElem = document.querySelector('#productsTitle');
const productsTotalElem = document.querySelector('#productsTotal');
const deliveryFeeElem = document.querySelector('#deliveryFee');
const orderTotalElem = document.querySelector('#orderTotal');
const checkoutButton = document.querySelector('#checkoutButton');

const requestOption = {
  1: '직접 수령하겠습니다.',
  2: '배송 전 연락바랍니다.',
  3: '부재 시 경비실에 맡겨주세요.',
  4: '부재 시 문 앞에 놓아주세요.',
  5: '부재 시 택배함에 넣어주세요.',
  6: '직접 입력',
};

checkLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertOrderSummary();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutTag.addEventListener('click', doLogout);
  searchAddressButton.addEventListener('click', searchAddress);
  requestSelectBox.addEventListener('change', handleRequestChange);
  checkoutButton.addEventListener('click', doCheckout);
}

// Daum 주소 API (사용 설명 https://postcode.map.daum.net/guide)
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
}

// 페이지 로드 시 실행되며, 결제정보 카드에 값을 삽입함.
async function insertOrderSummary() {
  const { selectedIds, productsTotal } = await getFromDb('order', 'summary');

  const hasItemToCheckout = selectedIds.length !== 0;
  if (!hasItemToCheckout) {
    alert('구매할 제품이 없습니다. 장바구니에서 선택해 주세요.');
    window.location.href = '/cart';
  }

  // 화면에 보일 상품명
  let productsTitle = '';

  for (const id of selectedIds) {
    const { title, quantity } = await getFromDb('cart', id);
    // 첫 제품이 아니라면, 다음 줄에 출력되도록 \n을 추가함
    if (productsTitle) {
      productsTitle += '\n';
    }

    productsTitle += `${title} / ${quantity}개`;
  }

  productsTitleElem.innerText = productsTitle;
  productsTotalElem.innerText = `${addCommas(productsTotal)}원`;

  if (hasItemToCheckout) {
    deliveryFeeElem.innerText = `3,000원`;
    orderTotalElem.innerText = `${addCommas(productsTotal + 3000)}원`;
  } else {
    deliveryFeeElem.innerText = `0원`;
    orderTotalElem.innerText = `0원`;
  }

  receiverNameInput.focus();
}

// "직접 입력" 선택 시 input칸 보이게 함
// default값(배송 시 요청사항을 선택해 주세여) 이외를 선택 시 글자가 진해지도록 함
function handleRequestChange(e) {
  const type = e.target.value;

  if (type === '6') {
    customRequestContainer.style.display = 'flex';
    customRequestInput.focus();
  } else {
    customRequestContainer.style.display = 'none';
  }

  if (type === '0') {
    requestSelectBox.style.color = 'rgba(0, 0, 0, 0.3)';
  } else {
    requestSelectBox.style.color = 'rgba(0, 0, 0, 1)';
  }
}

// 결제 진행
async function doCheckout() {
  const receiverName = receiverNameInput.value;
  const receiverPhoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const requestType = requestSelectBox.value;
  const customRequest = customRequestInput.value;
  const totalPrice = convertToNumber(orderTotalElem.innerText);
  const { selectedIds } = await getFromDb('order', 'summary');

  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
    return alert('배송지 정보를 모두 입력해 주세요.');
  }

  // 요청사항의 종류에 따라 request 문구가 달라짐
  let request;
  if (requestType === 0) {
    request = '';
  } else if (requestType === 6) {
    request = customRequest;
  } else {
    request = requestOption[requestType];
  }

  const address = {
    postalCode,
    address1,
    address2,
    receiverName,
    receiverPhoneNumber,
  };

  try {
    // 전체 주문을 등록함
    const orderData = await Api.post('/api/order', {
      totalPrice,
      address,
      request,
    });

    const orderId = orderData._id;

    // 제품별로 주문아이템을 등록함
    for (const productId of selectedIds) {
      const { quantity, price } = await getFromDb('cart', productId);
      const totalPrice = quantity * price;

      await Api.post('/api/orderitem', {
        orderId,
        productId,
        quantity,
        totalPrice,
      });

      // indexedDB에서 해당 제품 관련 데이터를 제거함
      await deleteFromDb('cart', productId);
      await putToDb('order', 'summary', (data) => {
        data.ids = data.ids.filter((id) => id !== productId);
        data.selectedIds = data.selectedIds.filter((id) => id !== productId);
        data.productsCount -= 1;
        data.productsTotal -= totalPrice;
      });
    }

    alert('결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.');
    window.location.href = '/order/complete';
  } catch (err) {
    console.log(err);
    alert(`결제 중 문제가 발생하였습니다: ${err.message}`);
  }
}