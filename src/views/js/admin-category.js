import { addImage, Api } from './common/index.js';

// 요소(element)들과 상수들
const nameInput = document.querySelector('#nameInput');
const descriptionInput = document.querySelector('#descriptionInput');
const submitButton = document.querySelector('#addCategoryBtn');

eventListeners();

// 각 요소에 이벤트 추가
function eventListeners() {
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const description = descriptionInput.value;

    // 입력 칸이 비어 있으면 진행 불가
    if (!name || !description) {
      return alert('빈 칸이 없어야 합니다.');
    }

    const imageUrl = await addImage('imageInput', 'category');
    console.log({ imageUrl });
    const data = { name, description, imageUrl };

    const newCategory = await Api.post('/api/category', data);

    console.log({ newCategory });
  });
}
