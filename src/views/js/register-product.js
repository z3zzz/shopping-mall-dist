import { addImageToS3 } from './common/aws-s3.js';
import * as Api from './common/api.js';

// 요소(element)들과 상수들
const nameInput = document.querySelector('#nameInput');
const categorySelectBox = document.querySelector('#categorySelectBox');
const manufacturerInput = document.querySelector('#manufacturerInput');
const shortDescriptionInput = document.querySelector('#shortDescriptionInput');
const detailDescriptionInput = document.querySelector(
  '#detailDescriptionInput'
);
const inventoryInput = document.querySelector('#inventoryInput');
const priceInput = document.querySelector('#priceInput');
const submitButton = document.querySelector('#submitButton');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 사진은 AWS S3에 저장, 이후 제품 정보를 백엔드 db에 저장.
async function handleSubmit(e) {
  e.preventDefault();

  const name = nameInput.value;
  const categoryId = categorySelectBox.value;
  const manufacturer = manufacturerInput.value;
  const shortDescription = shortDescriptionInput.value;
  const detailDescription = detailDescriptionInput.value;
  const inventory = parseInt(inventoryInput.value);
  const price = parseInt(priceInput.value);

  // 입력 칸이 비어 있으면 진행 불가
  if (
    !name ||
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

  console.log(categoryName);

  try {
    const imageUrl = await addImageToS3('imageInput', categoryName);
    const data = {
      name,
      categoryId,
      manufacturer,
      shortDescription,
      detailDescription,
      inventory,
      price,
      imageUrl,
    };

    const newProduct = await Api.post('/api/product', data);

    alert(`정상적으로 ${name} 제품이 등록되었습니다.`);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
