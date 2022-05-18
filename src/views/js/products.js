import { getImageUrl } from './common/aws-s3.js';
import * as Api from './common/api.js';
import {
  randomId,
  checkLogin,
  doLogout,
  getUrlParams,
  addCommas,
  navigate,
} from './common/useful-functions.js';

// 요소(element), input 혹은 상수
const productItemContainer = document.querySelector('#producItemContainer');
const logoutATag = document.querySelector('#logoutATag');

checkLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  addProductItemsToContainer();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutATag.addEventListener('click', doLogout);
}

async function addProductItemsToContainer() {
  const { category } = getUrlParams();
  const products = await Api.get(`/api/productlist/category/${category}`);

  products.forEach(async (product) => {
    // 객체 destructuring
    const { _id, title, shortDescription, imageKey, isRecommended, price } =
      product;
    const imageUrl = await getImageUrl(imageKey);
    const random = randomId();

    productItemContainer.insertAdjacentHTML(
      'beforeend',
      `
      <div class="message media product-item" id="a${random}">
        <div class="media-left">
          <figure class="image">
            <img
              src="${imageUrl}"
              alt="제품 이미지"
            />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title">
              ${title}
              ${
                isRecommended
                  ? '<span class="tag is-success is-rounded">추천</span>'
                  : ''
              }
            </p>
            <p class="description">${shortDescription}</p>
            <p class="price">${addCommas(price)}원</p>
          </div>
        </div>
      </div>
      `
    );

    const productItem = document.querySelector(`#a${random}`);
    productItem.addEventListener('click', navigate(`/product?id=${_id}`));
  });
}
