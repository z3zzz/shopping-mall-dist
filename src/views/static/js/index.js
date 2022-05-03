import num from './module.js';

const elem = document.querySelector('#test');

console.log('index.js loaded');

setTimeout(() => {
  elem.innerText = num;
}, 2000);
