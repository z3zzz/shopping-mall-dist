import * as Api from '/api.js';
import {
  blockIfLogin,
  getUrlParams,
  validateEmail,
  createNavbar,
} from '/useful-functions.js';

// 요소(element), input 혹은 상수
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const submitButton = document.querySelector('#submitButton');
const googleLoginButton = document.querySelector('#googleLoginButton');
const kakaoLoginButton = document.querySelector('#kakaoLoginButton');

blockIfLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  createNavbar();
  //displayGoogleButton();
  initializeKakaoButton();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 로그인 진행
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // 잘 입력했는지 확인
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  if (!isEmailValid || !isPasswordValid) {
    return alert(
      '비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.'
    );
  }

  // 로그인 api 요청
  try {
    const data = { email, password };

    const result = await Api.post('/api/login', data);
    const { token, isAdmin } = result;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 단, 개발 중에는 편의상 localStorage에 저장
    localStorage.setItem('token', token);

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공

    // admin(관리자) 일 경우, localStorage에 기록함
    if (isAdmin) {
      localStorage.setItem('admin', 'admin');
    }

    // 기존 다른 페이지에서 이 로그인 페이지로 온 경우, 다시 돌아가도록 해 줌.
    const { previouspage } = getUrlParams();

    if (previouspage) {
      window.location.href = previouspage;

      return;
    }

    // 기존 다른 페이지가 없었던 경우, 그냥 기본 페이지로 이동
    window.location.href = '/';
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
        '781560730462-8jb80an9eu02nalbk5a2u27p7tvfvl94.apps.googleusercontent.com',
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(googleLoginButton, {
      theme: 'outline',
      text: 'signin_with',
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
    const result = await Api.post('/api/login/google', data);

    const token = result.token;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 단, 개발 중에는 편의상 localStorage에 저장
    localStorage.setItem('token', token);

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공

    // 기존 다른 페이지에서 이 로그인 페이지로 온 경우, 다시 돌아가도록 해 줌.
    const { previouspage } = getUrlParams();

    if (previouspage) {
      window.location.href = previouspage;

      return;
    }

    // 기존 다른 페이지가 없었던 경우, 그냥 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 카카오 로그인 api
// init 관련 문서: https://developers.kakao.com/docs/latest/ko/getting-started/sdk-js
// 팝업 관련 문서: https://developers.kakao.com/docs/latest/ko/kakaologin/js#advanced-guide
function initializeKakaoButton() {
  Kakao.init('b1fa466bef2a7006e303f09b63eb990c');

  kakaoLoginButton.addEventListener('click', (e) => {
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
      property_keys: ['kakao_account.email'],
    },
    success: handleKakaoData,
    fail: (err) => console.log(err),
  });
}

async function handleKakaoData(data) {
  // 사용자 데이터 추출
  const { email } = data.kakao_account;

  // 회원가입 api 요청
  try {
    const data = { email };

    const result = await Api.post('/api/login/kakao', data);

    const token = result.token;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 단, 개발 중에는 편의상 localStorage에 저장
    localStorage.setItem('token', token);

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공

    // 기존 다른 페이지에서 이 로그인 페이지로 온 경우, 다시 돌아가도록 해 줌.
    const { previouspage } = getUrlParams();

    if (previouspage) {
      window.location.href = previouspage;

      return;
    }

    // 기존 다른 페이지가 없었던 경우, 그냥 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
