import { addImageToS3, Api } from './common/index.js';

// 요소(element)들과 상수들
const nameInput = document.querySelector('#nameInput');
const descriptionInput = document.querySelector('#descriptionInput');
const submitButton = document.querySelector('#addCategoryBtn');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 사진은 AWS S3에 저장, 이후 카테고리 정보를 백엔드 db에 저장.
async function handleSubmit(e) {
  e.preventDefault();

  const name = nameInput.value;
  const description = descriptionInput.value;

  // 입력 칸이 비어 있으면 진행 불가
  if (!name || !description) {
    return alert('빈 칸이 없어야 합니다.');
  }

  try {
    const imageUrl = await addImageToS3('imageInput', 'category');
    const data = { name, description, imageUrl };

    const newCategory = await Api.post('/api/category', data);

    alert(`정상적으로 db에 카테고리가 등록되었습니다. \n${newCategory}`);
  } catch (err) {
    console.error(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요.\n${err.message}`);
  }
}
