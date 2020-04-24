/* 
  This JS file has all the variables and utility function used in the script.js. We can just import these file in the script.js
*/


export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomColor () {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

export function hideError() {
  error.classList.remove('active')
}

export function showError() {
  error.classList.add('active')
}


export function updateCounter(data) {
  const counters = document.querySelectorAll('.counter');
  const speed = 80;

  let interval;

  counters.forEach((counter, index) => {
    counter.setAttribute('data-target', Object.values(data).slice(1)[index]);
    interval = setInterval(countDown, 1, counter);
  });


  function countDown(counter) {
    let count = +counter.innerText;
    let target = +counter.getAttribute('data-target');
    let rotate = target / speed;

    if (count < target) {
      counter.innerText = Math.floor(count + rotate);
    } else if (count > target) {
      counter.innerText = Math.floor(count - rotate);
    } else if (count === target) {
      clearInterval(interval);
      return;
    }
  }
}


export const inputBox = document.querySelector('.form-control');
export const submitBtn = document.querySelector('.submit-btn');
export const loader = document.querySelector('.dot-typing-placeholder');
export const error = document.querySelector('.error-small');
export const URL = 'https://pomber.github.io/covid19/timeseries.json';
export const canvas = document.getElementById('corona-pie-graph');
export const countryChart = canvas.getContext('2d');
export const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];