import { random, hideError, showError } from './utility.js';
import { inputBox, submitBtn, loader, error, URL } from './utility.js';

let URL_2 = './js/corona_2.json';
let canvas = document.getElementById('corona-pie-graph');
let countryChart = canvas.getContext('2d');

let chart = new Chart(countryChart, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Death Rate - ' + (inputBox.value || "India"),
      data: [],
      backgroundColor: `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.6)`,
      borderJointStyle: 'miter',
      pointBorderColor: "#fff",
      pointBackgroundColor: '#ff3600',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointRadius: 5,
    }]
  },
  legend: {
    position: 'right',
    labels: {
      fontColor: '#998'
    },
    display: true
  }
});


function init(e) {
  e.preventDefault();

  if (inputBox.value != '') {
    let countryName = inputBox.value[0].toUpperCase() + inputBox.value.substring(1);

    hideError();

    loader.style.display = 'block';

    fetch(URL_2)
      .then(res => res.json())
      .then(res => {
        loader.style.display = 'none';
        getGraphData(res[countryName]);
      }).catch(err => {
        error.innerHTML = 'Please check your internet connection!';
        loader.style.display = 'none';
        showError();
      })
  } else {
    showError();
  }
}

function getGraphData (location) {

  // console.log(location);
  // updateCount(location);

  let monthData, latestDeath;
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const data = {};

  for (let i = 1; i <= new Date().getMonth() + 1; i++) {
    monthData = location.filter(l => {
      if (l.date.split("-")[1] == i) {
        return l;
      }
    }).filter(l => l.length != 0);


    latestDeath = monthData[monthData.length - 1];
    data[monthNames[i]] = latestDeath;  
  }

  updateData(data[monthNames[new Date().getMonth() + 1]]);
  updateGraphData(data);

}

function updateData (data) {
  const counters = document.querySelectorAll('.counter');
  const speed = 100;

  let interval;

  counters.forEach((counter, index) => {
    counter.setAttribute('data-target', Object.values(data).slice(1)[index]);
    interval = setInterval(countDown, 1, counter);
  });


  function countDown (counter) {
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


function updateGraphData(data) {

  let labels = Object.keys(data);
  let deaths = Object.values(data).map(d => d.deaths);


  chart.data.labels = labels;
  chart.data.datasets[0].data = deaths;
  chart.data.datasets[0].backgroundColor = `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.6)`
  chart.data.datasets[0].label = 'Death Rate - ' + (inputBox.value || "India");
  chart.update();
}


function showIndiaStatus() {

  loader.style.display = 'block';

  fetch(URL_2)
    .then(res => res.json())
    .then(res => {
      loader.style.display = 'none';
      getGraphData(res['India']);
    })
}


document.getElementById('label-check').addEventListener('click', () => {
  document.getElementById('close-check').checked = false;
});
document.getElementById('close-check-id').addEventListener('click', () => {
  document.getElementById('checkbox').checked = false;
});

window.addEventListener('load', showIndiaStatus);
submitBtn.addEventListener('click', init);