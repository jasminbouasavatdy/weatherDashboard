// variables created to use in javascript
var searchBtn = document.getElementById('button');
var weatherInfo = document.querySelector('#card');
var forecast = document.querySelector('#section')
var inputEL = document.querySelector('#search-input');
var api = '19deadf5a571709d548a2d61112c074d';

// three api links that I used to get the city, lat+lon and the 5 day forecast
var geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=';
var latLongURL = 'https://api.openweathermap.org/data/2.5/weather?lat=';
var fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='
// this was made so when I did a search in the search bar the page would not refresh everytime. I also console logged the data to make sure my button was clicked and working.
var handleSearchSubmit = function (event) {
  event.preventDefault();
  console.log('ive been clicked');
  console.log(inputEL.value);
// when the user inputs their city the trim will but off any white space and this is also to make sure an actual city was typed in.
  var city = inputEL.value.trim();
  if (city) {
    geoByName(city);
  } else {
    console.log('not a valid city')
  }
};

// this function was made to collect the data for the city that was input
var geoByName = function (citysearch) {
  var citySearchURL = geoURL + citysearch + '&appid=' + api + '&units=imperial';
  console.log(citySearchURL);
  fetch(citySearchURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            display(data);
          });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
};


var display = function (weatherData) {
  if (weatherData.length === 0) {
    console.log("no data");
    return;
  }
  var lat = weatherData[0].lat;
  var lon = weatherData[0].lon;
  var newLatLongURL = latLongURL + lat + '&lon=' + lon + '&appid=' + api + '&units=imperial';

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



      weatherInfo.appendChild(cardEl);

    });

}


var fiveForecast = function (lat, lon) {
  var forecastURL = fiveDayURL + lat + '&lon=' + lon + '&appid=' + api + '&units=imperial';
  console.log('hello', forecastURL);
  fetch(forecastURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data);
            for (var i = 0; i < 40; i += 8) {
              var card = document.createElement('div');
              var h3 = document.createElement('h3');
              var temp = document.createElement('p');
              var humidity = document.createElement('p');
              var windSpeed = document.createElement('p');


              h3.textContent = data.city.name + moment.unix(data.list[i].dt).format(" MM/DD/YYYY");
              console.log(i);
              temp.textContent = 'Temp: ' + data.list[i].main.temp + ' F';
              humidity.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %';
              windSpeed.textContent = 'Wind Speed: ' + data.list[i].wind.speed + ' mph';



              card.appendChild(h3);
              card.appendChild(temp);
              card.appendChild(humidity);
              card.appendChild(windSpeed);

              forecast.appendChild(card);
            };



          })
      }
    })
}




searchBtn.addEventListener('click', handleSearchSubmit);
