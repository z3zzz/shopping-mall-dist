import num from './test.js';

const elem = document.querySelector('#test');

console.log('index.js loaded');

setTimeout(() => {
  elem.innerText = num;
}, 2000);
