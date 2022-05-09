import * as Api from './common/api.js';
import { getUrlParams, validateEmail } from './common/usefulFunctions.js';

// 요소(element), input 혹은 상수
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const submitButton = document.querySelector('#submitButton');
const loginForm = document.querySelector('#loginForm');

addAllEvents();

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
    const token = result.token;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 단, 개발 중에는 편의상 localStorage에 저장
    localStorage.setItem('token', token);

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공

    // 기존 다른 페이지에서 이 로그인 페이지로 온 경우, 다시 돌아가도록 해 줌.
    const { previouspage } = getUrlParams();
    console.log({ previouspage });
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
