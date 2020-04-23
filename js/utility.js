/* 
  This JS file has all the variables and utility function used in the script.js. We can just import these file in the script.js
*/


export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hideError() {
  error.classList.remove('active')
}

export function showError() {
  error.classList.add('active')
}



export const inputBox = document.querySelector('.form-control');
export const submitBtn = document.querySelector('.submit-btn');
export const loader = document.querySelector('.dot-typing-placeholder');
export const error = document.querySelector('.error-small');
export const URL = 'https://pomber.github.io/covid19/timeseries.json';
