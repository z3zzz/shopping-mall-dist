import { getImageUrl } from './common/aws-s3.js';
import * as Api from './common/api.js';
import {
  checkLogin,
  doLogout,
  numberWithCommas,
} from './common/useful-functions.js';

// 요소(element), input 혹은 상수
const logoutTag = document.querySelector('#logoutTag');
const allSelectCheckbox = document.querySelector('#allSelectCheckbox');
const partialDeleteLabel = document.querySelector('#partialDeleteLabel');
const itemSelectCheckbox = document.querySelector('#itemSelectCheckbox');
const itemDeleteButton = document.querySelector('#itemDeleteButton');
const orderedProducts = document.querySelector('#orderedProducts');
const productsTotalPrice = document.querySelector('#productsTotalPrice');
const deliveryFee = document.querySelector('#deliveryFee');
const orderTotalPrice = document.querySelector('#orderTotalPrice');
const purchaseButton = document.querySelector('#purchaseButton');

checkLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  //injectProductData();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutTag.addEventListener('click', doLogout);
}

async function injectProductData() {
  const { id } = getUrlParams();
  const product = await Api.get(`/api/products/${id}`);

  // 객체 destructuring
  const {
    title,
    detailDescription,
    manufacturer,
    imageKey,
    isRecommended,
    price,
  } = product;
  const imageUrl = await getImageUrl(imageKey);

  productImageTag.src = imageUrl;
  titleTag.innerText = title;
  detailDescriptionTag.innerText = detailDescription;
  manufacturerTag.innerText = manufacturer;
  priceTag.innerText = `${numberWithCommas(price)}원`;

  if (isRecommended) {
    titleTag.insertAdjacentHTML(
      'beforeend',
      '<span class="tag is-success is-rounded">추천</span>'
    );
  }
}
