console.log('file loaded')
var formEL = document.querySelector('#city-search');
var searchBtn = document.getElementById('button');
var weatherInfo = document.querySelector('#card');
var inputEL = document.querySelector('#search-input');
var api = '19deadf5a571709d548a2d61112c074d';

// var requestURl = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.878113&lon=-87.629799&appid=8a4f71946c01452c9735df61812f9851&units=imperial';

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var latLongURL = 'https://api.openweathermap.org/data/2.5/weather?lat=';

var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=';

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


// var getFeaturedRepos = function (language) {
//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };
// var requestURl ='https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=19deadf5a571709d548a2d61112c074d&units=imperial';

var geoByName = function (citysearch) {
  var citySearchURL = geoURL + citysearch + '&appid=' + api;
  console.log(citySearchURL);
  fetch(citySearchURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            // change this later!!
            display(data,citysearch);
          });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
};


var display = function (wdata, citysearched) {
  if (wdata.length === 0) {
    console.log("no data");
    return;
  }
  var lat = wdata[0].lat;
  var lon = wdata[0].lon;
  var newLatLongURL = latLongURL + lat + '&lon=' + lon + '&appid=' + api;

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
          tempEl.textContent = 'Temp: ' + data.main.temp +' F';
          cardEl.appendChild(tempEl);
    
          var humidityEl = document.createElement('p')
          humidityEl.textContent = 'Humidity: ' + data.main.humidity + ' %';
          cardEl.appendChild(humidityEl);
    
    
          var windSpeedEl =document.createElement('p')
          windSpeedEl.textContent= 'Wind Speed: ' + data.wind.speed + ' mph';
          cardEl.appendChild(windSpeedEl);
    
    
    
          weatherInfo.appendChild(cardEl);
        });
        // .catch((err) =>console.log(err));
 
      }
  


  // fetch(requestURl)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);

  //     var cardEl = document.createElement('div');

  //     var h3El = document.createElement('h3');
  //     h3El.textContent = data.name;
  //     cardEl.appendChild(h3El);

  //     var tempEl = document.createElement('p');
  //     tempEl.textContent = 'Temp: ' + data.main.temp +' F';
  //     cardEl.appendChild(tempEl);

  //     var humidityEl = document.createElement('p')
  //     humidityEl.textContent = 'Humidity: ' + data.main.humidity + ' %';
  //     cardEl.appendChild(humidityEl);


  //     var windSpeedEl =document.createElement('p')
  //     windSpeedEl.textContent= 'Wind Speed: ' + data.wind.speed + ' mph';
  //     cardEl.appendChild(windSpeedEl);



  //     weatherInfo.appendChild(cardEl);
  //     // }
  //   })
  //   .catch((err) =>console.log(err));





searchBtn.addEventListener('click', handleSearchSubmit);
