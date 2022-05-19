import * as Api from '/api.js';
import { checkLogin, doLogout, navigate } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const logoutTag = document.querySelector('#logoutTag');
const orderDetailButton = document.querySelector('#orderDetailButton');
const shoppingButton = document.querySelector('#shoppingButton');

checkLogin();
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  logoutTag.addEventListener('click', doLogout);
  shoppingButton.addEventListener('click', navigate('/'));
}
