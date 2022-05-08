import * as Api from './common/api.js';
import { getImageUrl } from './common/aws-s3.js';

// 요소(element), input 혹은 상수
const sliderDiv = document.querySelector('#slider');
const sliderArrowLeft = document.querySelector('#sliderArrowLeft');
const sliderArrowRight = document.querySelector('#sliderArrowRight');

addAllEvents();
addAllElements();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  await addImageCardsToSlider();
  attachSlider();
}

// api에서 카테고리 정보 및 사진 가져와서 슬라이드로 사용
async function addImageCardsToSlider() {
  const categorys = await Api.get('/api/categorylist');

  categorys.forEach(async (category) => {
    // 객체 destructuring
    const { title, description } = category;
    const imageUrl = await getImageUrl('category/bpkpm_men-clothes.jpg');

    sliderDiv.innerHTML += `
      <div class="card">
        <div class="notification is-primary is-light">
          <p class="title is-3 is-spaced">${title}</p>
          <p class="subtitle is-6">${description}</p>
        </div>
        <div class="card-image">
          <figure class="image is-3by2">
            <img
              src="${imageUrl}"
              alt="카테고리 이미지"
            />
          </figure>
        </div>
      </div>
    `;
  });
}

// 슬라이드 가동 (위 카드가 html에 삽입된 이후에 실행되도록, timeout 약간 줌)
function attachSlider() {
  setTimeout(() => {
    const imageSlider = bulmaCarousel.attach('#slider', {
      //autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
      duration: 1200,
      pauseOnHover: false,
      navigation: false,
    });

    sliderArrowLeft.addEventListener('click', () => {
      imageSlider[0].previous();
    });

    sliderArrowRight.addEventListener('click', () => {
      imageSlider[0].next();
    });
  }, 200);
}
