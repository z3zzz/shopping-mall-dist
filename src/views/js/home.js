// 이미지 슬라이드
const imageSlider = bulmaCarousel.attach('#slider', {
  //autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  duration: 1200,
  pauseOnHover: false,
  navigation: false,
});

document.querySelector('.slider-arrow-left').addEventListener('click', () => {
  imageSlider[0].previous();
});

document.querySelector('.slider-arrow-right').addEventListener('click', () => {
  imageSlider[0].next();
});
