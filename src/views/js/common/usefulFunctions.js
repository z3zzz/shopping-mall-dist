// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 주소창의 url로부터 params를 얻어 객체로 만듦
export const getUrlParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const result = {};

  for (const [key, value] of urlParams) {
    result[key] = value;
  }

  return result;
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const numberWithCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 로그아웃(세션스토리지에서 토큰 제거)
// 개발 단계에서는 편의상 로컬스토리지 사용
export const doLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

// 로그인 여부(토큰 존재 여부) 확인
export const checkLogin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.replace('/login');
  }
};
