import { checkLogin, doLogout } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const logoutATag = document.querySelector('#logoutTag');

checkLogin();
addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutATag.addEventListener('click', doLogout);
}
