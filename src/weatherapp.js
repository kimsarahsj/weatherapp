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
todayHour.innerHTML = `${hours}`;
// ampm logic saying if the value of hours is greater than 12 to subtract 12 and add pm
//End get Hour
//Start get Minutes
let todayMinute = document.querySelector("#minute");
let minutes = now.getMinutes();
todayMinute.innerHTML = `${minutes} ${ampm}`;
//appended ampm to minutes since not defined in html
//End get Minutes

//********HOMEWORK - SEARCH RESULT********
//Start search bar city search & change location on card
function updateForecast(response) {
  let searchInput = document.querySelector("#search-city");
  console.log(searchInput.value);
  let cityLocation = document.querySelector("#location");
  cityLocation.innerHTML = `${searchInput.value}`;
  let temperature = Math.round(response.data.main.temp);
  let todaysTemperature = document.querySelector("#temperature");
  todaysTemperature.innerHTML = `${temperature}°`;
  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].description;
  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
}

function searchForecast() {
  let city = document.querySelector("#search-city").value;
  let encoded = encodeURI(city); //will send the city to the url even if a two word city is entered
  let units = "imperial";
  let key = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encoded}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(updateForecast);
}

let button = document.querySelector("button");
button.addEventListener("click", searchForecast);
//let button = document.querySelector("button");
//button.addEventListener("click", searchForecast);
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
  todaysTemperature.innerHTML = `${temperature}°`;
  let latLongCity = response.data.name;
  console.log(latLongCity);
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = `${latLongCity}`;
  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
}
let currentCityBtn = document.querySelector("#locationBtn");
currentCityBtn.addEventListener("click", getCurrentPosition);
//End update the current temperature with current temp data when current location button is clicked.
