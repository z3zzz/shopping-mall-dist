import { addImageToS3 } from './common/aws-s3.js';
import * as Api from './common/api.js';

// 요소(element), input 혹은 상수
const titleInput = document.querySelector('#titleInput');
const descriptionInput = document.querySelector('#descriptionInput');
const imageInput = document.querySelector('#imageInput');
const fileNameSpan = document.querySelector('#fileNameSpan');
const submitButton = document.querySelector('#addCategoryButton');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
  imageInput.addEventListener('change', handleImageUpload);
}

// 카테고리 추가하기 - 사진은 AWS S3에 저장, 이후 카테고리 정보를 백엔드 db에 저장.
async function handleSubmit(e) {
  e.preventDefault();

  const title = titleInput.value;
  const description = descriptionInput.value;

  // 입력 칸이 비어 있으면 진행 불가
  if (!title || !description) {
    console.log({ title, description });
    return alert('빈 칸이 없어야 합니다.');
  }

  try {
    const imageUrl = await addImageToS3(imageInput, 'category');
    const data = { title, description, imageUrl };

    await Api.post('/api/category', data);

    alert(`정상적으로 ${title} 카테고리가 등록되었습니다.`);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 사용자가 사진을 업로드했을 때, 파일 이름이 화면에 나타나도록 함.
function handleImageUpload() {
  const file = imageInput.files[0];
  if (file) {
    fileNameSpan.innerText = file.name;
  } else {
    fileNameSpan.innerText = '';
  }
}
