//Start setting temperature variables.
let fahrenheit = 0;
let celsius = 0;
let feelsLikeF = 0;
let feelsLikeC = 0;
let highF = 0;
let highC = 0;
let lowF = 0;
let lowC = 0;
let mph = 0;
let kmph = 0;
//Arry of object with objects to store each forecast day's temperature
let fiveDay = [
  {
    fahrenheit: {
      high: 0,
      low: 0,
    },
    celsius: {
      high: 0,
      low: 0,
    },
  },
  {
    fahrenheit: {
      high: 0,
      low: 0,
    },
    celsius: {
      high: 0,
      low: 0,
    },
  },
  {
    fahrenheit: {
      high: 0,
      low: 0,
    },
    celsius: {
      high: 0,
      low: 0,
    },
  },
  {
    fahrenheit: {
      high: 0,
      low: 0,
    },
    celsius: {
      high: 0,
      low: 0,
    },
  },
  {
    fahrenheit: {
      high: 0,
      low: 0,
    },
    celsius: {
      high: 0,
      low: 0,
    },
  },
];

//fahrenheit to celsius conversion calculation
function ftoC(F) {
  return (F - 32) * (5 / 9);
}

function miletokm(miles) {
  return miles * 1.609344;
}
//********SEARCH RESULT********
//Start search bar city search & change location on card
function updateForecast(response) {
  //update location
  let searchInput = document.querySelector("#search-city");
  console.log(searchInput.value);
  let cityLocation = document.querySelector("#location");
  cityLocation.innerHTML = response.data.name;
  //update temperature
  fahrenheit = Math.round(response.data.main.temp);
  celsius = ftoC(fahrenheit);
  let todaysTemperature = document.querySelector("#temperature");
  todaysTemperature.innerHTML = `${fahrenheit}`;
  //update conditions
  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].description;
  //Update icon based on weather condition
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //update wind speed
  mph = Math.round(response.data.wind.speed);
  kmph = miletokm(mph);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `wind speed ${Math.round(mph)} mph`;
  //update high temperature
  highF = Math.round(response.data.main.temp_max);
  highC = ftoC(highF);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `high ${highF}??F`;
  //update low temperature
  lowF = Math.round(response.data.main.temp_min);
  lowC = ftoC(lowF);
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `low ${lowF}??F`;
  //resets conversions links to fahrenheit as default
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      fiveDay[index].fahrenheit.high = Math.round(forecastDay.temp.max);
      fiveDay[index].fahrenheit.low = Math.round(forecastDay.temp.min);
      fiveDay[index].celsius.high = Math.round(ftoC(forecastDay.temp.max));
      fiveDay[index].celsius.low = Math.round(ftoC(forecastDay.temp.min));
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 five-day-forecast">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span id="day-${index}-max" class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}??  </span> |
          <span id="day-${index}-min" class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}?? </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function searchForecast(city) {
  let encoded = encodeURI(city); //will send the city to the url even if a two word city is entered
  let units = "imperial";
  let key = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encoded}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(updateForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  searchForecast(cityInputElement.value);
}

let button = document.querySelector("#search-form");
button.addEventListener("submit", handleSubmit);

//End search bar city search & change location on card

//********BONUS - CURRENT LOCATION********
//Start getting current location when current location button is clicked
let lat;
let long;
function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updatePage);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Start update the current temperature with current temp data when current location button is clicked.
function updatePage(response) {
  let temperature = Math.round(response.data.main.temp);
  let todaysTemperature = document.querySelector("#temperature");
  todaysTemperature.innerHTML = `${temperature}??`;
  let latLongCity = response.data.name;
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = `${latLongCity}`;
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `high ${Math.round(response.data.main.temp_max)} ??F`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `low ${Math.round(response.data.main.temp_min)} ??F`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `wind speed ${Math.round(mph)} mph`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let currentCityBtn = document.querySelector("#locationBtn");
currentCityBtn.addEventListener("click", getCurrentPosition);
//End update the current temperature with current temp data when current location button is clicked.

//fahrenheit coversion link
function displayfahrenheitTemperature(event) {
  event.preventDefault();
  //add or remove active class
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheit);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `high ${Math.round(highF)} ??F`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `low ${Math.round(lowF)} ??F`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `wind speed ${Math.round(mph)} mph`;
  //5-day forecast
  for (let i = 0; i < 5; i++) {
    let fiveDayHigh = document.querySelector(`#day-${i}-max`);
    let fiveDayLow = document.querySelector(`#day-${i}-min`);
    fiveDayHigh.innerHTML = fiveDay[i].fahrenheit.high + `??`;
    fiveDayLow.innerHTML = fiveDay[i].fahrenheit.low + `??`;
  }
}
//Celsius coversion link
function displayCelsiusTemperature(event) {
  event.preventDefault();
  //add or remove active class
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsius);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `high ${Math.round(highC)} ??C`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `low ${Math.round(lowC)} ??C`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `wind speed ${Math.round(kmph)} kmph`;
  //5-day forecast
  for (let i = 0; i < 5; i++) {
    let fiveDayHigh = document.querySelector(`#day-${i}-max`);
    let fiveDayLow = document.querySelector(`#day-${i}-min`);
    fiveDayHigh.innerHTML = fiveDay[i].celsius.high + `??`;
    fiveDayLow.innerHTML = fiveDay[i].celsius.low + `??`;
  }
}
//when fahrenheit or Celsius link is clicked, convert temp
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let now = new Date();
//Start numerical date JS inject
let todayDate = document.querySelector("#date");
let date = now.getDate();
todayDate.innerHTML = `${date}`;
//End numerical date
//Start actual day
let todayDay = document.querySelector("#day");
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
let day = days[now.getDay()];
todayDay.innerHTML = `${day}`;
//End actual day

//Start get month
let todayMonth = document.querySelector("#month");
let months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
let month = months[now.getMonth()];
todayMonth.innerHTML = `${month}`;
//End get month
//Start get Hour
let todayHour = document.querySelector("#hour");
let hours = now.getHours();
let ampm = "am";
if (hours > 12) {
  ampm = "pm";
  hours = hours - 12;
}
if (hours == 12) {
  ampm = "pm";
}
todayHour.innerHTML = `${hours}`;
// ampm logic saying if the value of hours is greater than 12 to subtract 12 and add pm
//End get Hour
//Start get Minutes
let todayMinute = document.querySelector("#minute");
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
  if (minutes == 0) {
    minutes = "00";
  }
}
todayMinute.innerHTML = `${minutes} ${ampm}`;
//appended ampm to minutes since not defined in html
//End get Minutes

searchForecast("Atlanta"); //search on load
