import { addImageToS3 } from './common/aws-s3.js';
import * as Api from './common/api.js';

// 요소(element)들과 상수들
const titleInput = document.querySelector('#titleInput');
const categorySelectBox = document.querySelector('#categorySelectBox');
const manufacturerInput = document.querySelector('#manufacturerInput');
const shortDescriptionInput = document.querySelector('#shortDescriptionInput');
const detailDescriptionInput = document.querySelector(
  '#detailDescriptionInput'
);
const imageInput = document.querySelector('#imageInput');
const inventoryInput = document.querySelector('#inventoryInput');
const priceInput = document.querySelector('#priceInput');
const submitButton = document.querySelector('#submitButton');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
  imageInput.addEventListener('change', handleImageUpload);
}

// 제품 추가 - 사진은 AWS S3에 저장, 이후 제품 정보를 백엔드 db에 저장.
async function handleSubmit(e) {
  e.preventDefault();

  const title = titleInput.value;
  const categoryId = categorySelectBox.value;
  const manufacturer = manufacturerInput.value;
  const shortDescription = shortDescriptionInput.value;
  const detailDescription = detailDescriptionInput.value;
  const inventory = parseInt(inventoryInput.value);
  const price = parseInt(priceInput.value);

  // 입력 칸이 비어 있으면 진행 불가
  if (
    !title ||
    !categoryId ||
    !manufacturer ||
    !shortDescription ||
    !detailDescription ||
    !inventory ||
    !price
  ) {
    return alert('빈 칸 및 0이 없어야 합니다.');
  }

  // S3 에 이미지가 속할 폴더 이름은 카테고리명으로 함.
  const index = categorySelectBox.selectedIndex;
  const categoryName = categorySelectBox[index].text;

  try {
    const imageUrl = await addImageToS3(imageInput, categoryName);
    const data = {
      title,
      categoryId,
      manufacturer,
      shortDescription,
      detailDescription,
      inventory,
      price,
      imageUrl,
    };

    await Api.post('/api/product', data);

    alert(`정상적으로 ${title} 제품이 등록되었습니다.`);
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
