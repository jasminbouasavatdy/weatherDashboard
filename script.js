console.log('file loaded')
var formEL = document.querySelector('#city-search');
var searchBtn = document.getElementById('button');
var weatherInfo = document.querySelector('#card');
var inputEL = document.querySelector('#search-input');
var api = '19deadf5a571709d548a2d61112c074d';


var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=';
var latLongURL = 'https://api.openweathermap.org/data/2.5/weather?lat=';

var handleSearchSubmit = function (event) {
  event.preventDefault();
  console.log('ive been clicked');
  console.log(inputEL.value);

  var city = inputEL.value.trim();
  if (city) {
    geoByName(city);
  } else {
    console.log('not a valid city')
  }
};


var geoByName = function (citysearch) {
  var citySearchURL = geoURL + citysearch + '&appid=' + api +'&units=imperial';
  console.log(citySearchURL);
  fetch(citySearchURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            display(data, citysearch);
          });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
};


var display = function (weatherData, citysearched) {
  if (weatherData.length === 0) {
    console.log("no data");
    return;
  }
  var lat = weatherData[0].lat;
  var lon = weatherData[0].lon;
  var newLatLongURL = latLongURL + lat + '&lon=' + lon + '&appid=' + api +'&units=imperial';

  fiveForecast(lat, lon);



  fetch(newLatLongURL)
    .then(function (response) {
      return response.json();

    })

    .then(function (data) {
      console.log(data);
      var cardEl = document.createElement('div');

      var h3El = document.createElement('h3');
      h3El.textContent = data.name + moment.unix(data.dt).format(" MM/DD/YYYY");
      cardEl.appendChild(h3El);

      var tempEl = document.createElement('p');
      tempEl.textContent = 'Temp: ' + data.main.temp + ' F';
      cardEl.appendChild(tempEl);

      var humidityEl = document.createElement('p')
      humidityEl.textContent = 'Humidity: ' + data.main.humidity + ' %';
      cardEl.appendChild(humidityEl);


      var windSpeedEl = document.createElement('p')
      windSpeedEl.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';
      cardEl.appendChild(windSpeedEl);

      



    });

}


var fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='
var fiveForecast = function (lat, lon) {
  var forecastURL = fiveDayURL + lat + '&lon=' + lon + '&appid=' + api +'&units=imperial';
  console.log('hello', forecastURL);
  fetch(forecastURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data);
            // for(var i = 0; i < 40;  i+7){
            //   console.log(data.list[i]);
            // };
            var sectionEl = document.createElement('section');

            // var h3 = document.createElement('h3');
            // var temp = document.createElement('p');
            // var humidity = document.createElement('p');
            // var windSpeed = document.createElement('p');


            // h3.textContent = data.name + moment.unix(data.dt).format(" MM/DD/YYYY");
            // temp.textContent = 'Temp: ' + data.main.temp + ' F';
            // humidity.textContent = 'Humidity: ' + data.main.humidity + ' %';
            // windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';



            // sectionEl.appendChild(h3);
            // sectionEl.appendChild(temp);
            // sectionEl.appendChild(humidity);
            // sectionEl.appendChild(windSpeed);


          })
      }
    })
}




searchBtn.addEventListener('click', handleSearchSubmit);
