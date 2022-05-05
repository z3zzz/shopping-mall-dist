import { addPhoto } from './utils/aws-s3.js';

// 요소(element)들과 상수들
const nameInput = document.querySelector('#nameInput');
const descriptionInput = document.querySelector('#descriptionInput');
const submitButton = document.querySelector('#addCategoryBtn');

eventListeners();

// 각 요소에 이벤트 추가
const eventListeners = () => {
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const photoUrl = await addPhoto('imageInput', 'category');
    console.log({ photoUrl });
  });
};

// 함수들 정의
const addCategoryToDb = (url) => {
  // 입력 칸이 비어 있으면 진행 불가
  if (!nameInput.value || !descriptionInput.value) {
    return alert('빈 칸이 없어야 합니다.');
  }
};
