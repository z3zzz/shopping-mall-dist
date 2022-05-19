//import { checkLogin, doLogout } from '/useful-functions.js';
//import * as Api from '/api.js'

// 요소(element), input 혹은 상수
const logoutATag = document.querySelector('#logoutATag');
const fullNameInput = document.querySelector('#fullNameInput');
const fullNameToggle = document.querySelector('#fullNameToggle');
const passwordInput = document.querySelector('#passwordInput');
const passwordToggle = document.querySelector('#passwordToggle');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const postalCodeInput = document.querySelector('#postalCode');
const searchAddressButton = document.querySelector('#searchAddressButton');
const addressToggle = document.querySelector('#addressToggle');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const phoneNumberToggle = document.querySelector('#phoneNumberToggle');
const saveButton = document.querySelector('#saveButton');

//checkLogin();
addAllElements();
addAllEvents();

// 요소 삽입 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  insertUserData();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  //logoutATag.addEventListener('click', doLogout);
  fullNameToggle.addEventListener('change', toggleTargets);
  passwordToggle.addEventListener('change', toggleTargets);
  addressToggle.addEventListener('change', toggleTargets);
  phoneNumberToggle.addEventListener('change', toggleTargets);
  searchAddressButton.addEventListener('click', searchAddress);
  saveButton.addEventListener('click', saveUserData)
}

// input 및 주소찾기 버튼의 disabled <-> abled 상태를 토글함.
function toggleTargets(e) {
  const toggleId = e.target.id;
  const isChecked = e.target.checked;

  // 어떤 요소들의 토글인지 확인
  let targets;

  if (toggleId.includes('fullName')) {
    targets = [fullNameInput];
  }
  if (toggleId.includes('password')) {
    targets = [passwordInput, passwordConfirmInput];
  }
  if (toggleId.includes('address')) {
    targets = [
      postalCodeInput,
      address1Input,
      address2Input,
      searchAddressButton,
    ];
  }
  if (toggleId.includes('phoneNumber')) {
    targets = [phoneNumberInput];
  }

  // 토글 진행 (닫힘 토글일 시에는, 값이 비어있지 않은지 확인)
  for (const target of targets) {
    if (isChecked) {
      target.removeAttribute('disabled');
      continue;
    }

    const isEmpty = !target.value;
    const isButton = target.tagName === 'button';
    const shouldFillIn = isEmpty && !isButton;

    if (shouldFillIn) {
      e.target.checked = true;
      target.focus();
      return alert('입력 칸이 비어 있습니다. 작성해 주세요.');
    }
  }

  // disabled 해제하는 것은 위에서 했으므로, 바로 return하면 됨.
  if (isChecked) {
    return;
  }

  // disabled 처리를 위해 다시 한번 for 루프 씀.
  for (const target of targets) {
    target.setAttribute('disabled', '');
  }
}

// 페이지 로드 시 실행
async function insertUserData() {
  const userData = await Api.get('/api/user');

  // 객체 destructuring
  const { fullName, address, phoneNumber } = userData;

  fullNameInput.value = fullName;

  if (address) {
    const { postalCode, address1, address2 } = address;

    postalCodeInput.value = postalCode;
    address1Input.value = address1;
    address2Input.value = address2;
  }

  if (phoneNumber) {
    phoneNumberInput.value = phoneNumber;
  }

  // 기본적으로 disabled 상태로 만듦
  fullNameInput.setAttribute('disabled', '');
  passwordInput.setAttribute('disabled', '');
  passwordConfirmInput.setAttribute('disabled', '');
  postalCodeInput.setAttribute('disabled', '');
  searchAddressButton.setAttribute('disabled', '');
  address1Input.setAttribute('disabled', '');
  address2Input.setAttribute('disabled', '');
  phoneNumberInput.setAttribute('disabled', '');
}

// Daum 주소 API (사용 설명 https://postcode.map.daum.net/guide)
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
}

// db에 정보 저장
function saveUserData() {
  const fullName = fullNameInput.value
  const password = passwordInput.value
  const passwordConfirm = passwordConfirmInput.value
  const postalCode = postalCodeInput.value
  const address1 = address1.value
  const address2 = address2.value
  const phoneNumber = phoneNumberInput.value

  if (password !== passwordConfirm) {
    return alert("비밀번호가 일치하지 않습니다.")
  }

  const data = {}

  if ()



  
}
