import * as Api from '../api.js';
import { validateEmail, createNavbar } from '../useful-functions.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const googleRegisterButton = document.querySelector('#googleRegisterButton');
const kakaoRegisterButton = document.querySelector('#kakaoRegisterButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  createNavbar();
  displayGoogleButton();
  initializeKakaoButton();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  // 회원가입 api 요청
  try {
    const data = { fullName, email, password };

    await Api.post('/api/register', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 구글 OAuth 용, 공식 문서 코드 그대로 사용
// https://developers.google.com/identity/gsi/web/guides/display-button?hl=en#javascript
function displayGoogleButton() {
  window.onload = function () {
    google.accounts.id.initialize({
      client_id:
        '218765734427-6p3rnnm65g4mubbg7626b50vpcrnde80.apps.googleusercontent.com',
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(googleRegisterButton, {
      theme: 'outline',
      text: 'signup_with',
      size: 'large',
    });

    google.accounts.id.prompt();
  };
}

async function handleGoogleResponse(response) {
  // 구글 계정 정보가 담긴 jwt 토큰
  const googleToken = response.credential;

  const data = { googleToken };

  try {
    await Api.post('/api/register/google', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 카카오 로그인 api를 회원가입에 사용
// init 관련 문서: https://developers.kakao.com/docs/latest/ko/getting-started/sdk-js
// 팝업 관련 문서: https://developers.kakao.com/docs/latest/ko/kakaologin/js#advanced-guide
function initializeKakaoButton() {
  Kakao.init('b1fa466bef2a7006e303f09b63eb990c');

  kakaoRegisterButton.addEventListener('click', (e) => {
    e.preventDefault();

    Kakao.Auth.login({
      success: handleKakaoLogin,
      fail: (err) => console.log(err),
    });
  });
}

// "카카오로 시작하기" 버튼 누르고 동의 진행한 사용자의 정보를 가져옴
// 문서: https://developers.kakao.com/docs/latest/ko/kakaologin/js#req-user-info
function handleKakaoLogin() {
  Kakao.API.request({
    url: '/v2/user/me',
    data: {
      property_keys: ['kakao_account.email', 'kakao_account.profile'],
    },
    success: handleKakaoData,
    fail: (err) => console.log(err),
  });
}

async function handleKakaoData(data) {
  // 사용자 데이터 추출
  const { email, profile } = data.kakao_account;
  const { nickname } = profile;

  // 회원가입 api 요청
  try {
    const data = { nickname, email };

    await Api.post('/api/register/kakao', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
