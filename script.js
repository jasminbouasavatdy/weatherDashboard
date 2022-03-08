console.log('file loaded')

var searchBtn = document.getElementById('button');
var weatherInfo = document.querySelector('#card');






var requestURl = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.878113&lon=-87.629799&appid=8a4f71946c01452c9735df61812f9851&units=imperial';


// function handleSearchSubmit(event){
//   event.preventDefault();
//   searchBtn.addEventListener('click', function(){
//      console.log('ive been clicked');
//   })

// }



fetch(requestURl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.current.temp);
    console.log(data.current.weather[0].description);

    // for (var i = 0; i < data.length; i++) {
      // console.log(data.current);
      
      // var searchResultsEl = document.querySelector('#search-results');
      var cardEl = document.createElement('div');
      var h3El =  document.createElement('h3');
      var descriptionEl = document.createElement('p');
      h3El.textContent = data.current.temp;
      descriptionEl.textContent = data.current.weather[0].description;
      
      cardEl.appendChild(h3El);
      cardEl.appendChild(descriptionEl);
      weatherInfo.appendChild(cardEl);
    // }
    
  });

  
  function handleSearchSubmit(event){
    event.preventDefault();
       console.log('ive been clicked');
  }

  searchBtn.addEventListener('click',handleSearchSubmit);







