import * as Api from './common/api.js';
import {
  checkLogin,
  doLogout,
  numberWithCommas,
  getNumbers,
  navigate,
  compressString,
} from './common/useful-functions.js';
import { deleteFromDb, getFromDb, putToDb } from './common/indexed-db.js';

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
      console.log(data);
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
        console.log(extraAddr);
      } else {
        console.log(extraAddr);
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
  productsTotalElem.innerText = `${numberWithCommas(productsTotal)}원`;

  deliveryFeeElem.innerText = `3,000원`;
  orderTotalElem.innerText = `${numberWithCommas(productsTotal + 3000)}원`;
}

// "직접 입력" 선택 시 input칸 보이게 함
// default값(배송 시 요청사항을 선택해 주세여) 이외를 선택 시 글자가 진해지도록 함
function handleRequestChange(e) {
  const type = e.target.value;
  console.log(type);

  if (type === '6') {
    customRequestContainer.style.display = 'flex';
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

  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
    return alert('배송지 정보를 모두 입력해 주세요.');
  }

  let request;
  if (requestType === 0) {
    request = '';
  } else if (requestType === 6) {
    request = customRequest;
  } else {
    request = requestOption[requestType];
  }

  const orderData = await Api.post();
}
