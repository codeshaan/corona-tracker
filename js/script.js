// importing utility methods & variables from the utility.js
import { monthNames, hideError, showError } from './utility.js';
import { inputBox, submitBtn, loader, error, URL, canvas, countryChart } from './utility.js';
import { updateCounter } from './utility.js';

// By default show the current status of India
let currentCountry = 'India';

/* The chart configuration  ===> Do not change chart.options.responsive & chart.options.maintainAspectRatio <====*/
let chart = new Chart(countryChart, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Confirmed',
      data: [],
      backgroundColor: 'transparent',
      borderJointStyle: 'miter',
      pointBorderColor: "#fff",
      pointBackgroundColor: '#592bb9',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointRadius: 5,
    }, {
      label: 'Deaths',
      data: [],
      backgroundColor: 'transparent',
      borderJointStyle: 'miter',
      pointBorderColor: "#fff",
      pointBackgroundColor: '#592bb9',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointRadius: 5,
    }, {
      label: 'Recovered',
      data: [],
      backgroundColor: 'transparent',
      borderJointStyle: 'miter',
      pointBorderColor: "#fff",
      pointBackgroundColor: '#592bb9',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointRadius: 5,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: `${currentCountry}'s  data`,
      fontSize: 25
    }
  }
});


function init(e) {
  e.preventDefault();

  // get the query from the user
  if (inputBox.value != '') {


    hideError();
    // hide the error if there is any

    // format the country name according to the name stored in the API

    let countryName = inputBox.value[0].toUpperCase() + inputBox.value.substring(1);

    // change the currentCountry variable
    currentCountry = countryName;

    if (countryName.split(" ").length > 1) {
      // if the country name has more than one word separated by space then
      let countryNameArr = countryName.split(" ");

      countryName = countryNameArr[1] + ", " + countryNameArr[0];
    }


    fetchData(URL, countryName);
    // fetch the country's data from API

  } else {
    // show error is the input box is empty
    showError();
  }
}

async function fetchData(URL, countryName) {
  // The loading animation
  loader.style.display = 'block';

  try {
    const res = await fetch(URL);
    const json = await res.json();

    // hide the loading animation
    loader.style.display = 'none';

    // get the country's data to be plotted on the graph
    getGraphData(json[countryName]);
  } catch (err) {
    console.log(err);
    error.innerHTML = "Oops...Something might have went wrong!";
    loader.style.display = 'none';
    showError();
  }
}


function getGraphData(locationData) {

  /* 
    monthData = stores each day's data of each month
    currenMonthName = stores current month name
    data = stores the last day's data of the month (last day's data will show the overall data of that mont)
  */

  let monthData = [], currentMonthName = '', data = {};

  for (let i = 1; i <= new Date().getMonth() + 1; i++) {
    // Get each month's data of death, confirmed, & recovered & select the latest data from it
    monthData = locationData.filter(l => l.date.split("-")[1] == i)

    currentMonthName = monthNames[i];
    data[currentMonthName] = monthData[monthData.length - 1];;
  }

  // show the counting animation for the current status of a country
  updateCounter(data[currentMonthName]);

  // update the graph based on the each month's status of a country
  updateGraphData(data);
}


function updateGraphData(data) {

  // get each month's data;
  const innerObjects = Object.values(data);

  // get the month names and store it as labels for the graph
  const labels = Object.keys(data);

  // From the innerObjects.array, grab the confirmed, deaths, & recovered data
  const deaths = innerObjects.map(obj => obj.deaths);
  const confirmed = innerObjects.map(obj => obj.confirmed);
  const recovered = innerObjects.map(obj => obj.recovered);

  // setting new graph here

  chart.data.labels = labels;
  chart.options.title.text = `${currentCountry}'s  data`;

  [chart.data.datasets[0].data, chart.data.datasets[1].data, chart.data.datasets[2].data] = [confirmed, deaths, recovered];
  [chart.data.datasets[0].borderColor, chart.data.datasets[1].borderColor, chart.data.datasets[2].borderColor] = ['#e4f32e', '#e52127', '#2f8b09']

  // update the graph in the UI
  chart.update();
}


function showIndiaStatus() {
  // This function will fire off when the body of the page loads and show the current status of India by default
  // currentCountry => 'India';  => This value can change afterwards based on which country user searches...
  fetchData(URL, currentCountry);
}


// Event Listeners for toggling the sidebar

document.getElementById('label-check').addEventListener('click', () => {
  document.getElementById('close-check').checked = false;
});
document.getElementById('close-check-id').addEventListener('click', () => {
  document.getElementById('checkbox').checked = false;
});

// show India's current status when the page loads
window.addEventListener('load', showIndiaStatus);

// on click of submit button => init();
submitBtn.addEventListener('click', init);