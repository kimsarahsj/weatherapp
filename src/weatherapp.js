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

//Start setting temperature variables.
let farenheit = 0;
let celsius = 0;
let feelsLikeF = 0;
let feelsLikeC = 0;
let highF = 0;
let highC = 0;
let lowF = 0;
let lowC = 0;

//farenheit to celsius conversion calculation
function ftoC(F) {
  return (F - 32) * (5 / 9);
}
//********HOMEWORK - SEARCH RESULT********
//Start search bar city search & change location on card
function updateForecast(response) {
  //update location
  let searchInput = document.querySelector("#search-city");
  console.log(searchInput.value);
  let cityLocation = document.querySelector("#location");
  cityLocation.innerHTML = response.data.name;
  //update temperature
  farenheit = Math.round(response.data.main.temp);
  celsius = ftoC(farenheit);
  let todaysTemperature = document.querySelector("#temperature");
  todaysTemperature.innerHTML = `${farenheit}`;
  //update conditions
  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].description;
  //update wind speed
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  console.log(windSpeed);
  //update high temperature
  highF = Math.round(response.data.main.temp_max);
  highC = ftoC(highF);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `${highF}°`;
  //update low temperature
  lowF = Math.round(response.data.main.temp_min);
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${lowF}°`;
}

function searchForecast(city) {
  let encoded = encodeURI(city); //will send the city to the url even if a two word city is entered
  let units = "imperial";
  let key = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encoded}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(updateForecast);
}

searchForecast("Atlanta"); //search on load

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  searchForecast(cityInputElement.value);
}

let button = document.querySelector("button");
button.addEventListener("click", handleSubmit);

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
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
}
let currentCityBtn = document.querySelector("#locationBtn");
currentCityBtn.addEventListener("click", getCurrentPosition);
//End update the current temperature with current temp data when current location button is clicked.

//Farenheit coversion link
function displayFarenheitTemperature(event) {
  event.preventDefault();
  //add or remove active class
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheit);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `${Math.round(highF)}°`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${Math.round(lowF)}°`;
}
//Celsius coversion link
function displayCelsiusTemperature(event) {
  event.preventDefault();
  //add or remove active class
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsius);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = `${Math.round(highC)}°`;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = `${Math.round(lowC)}°`;
}
//when Farenheit or Celsius link is clicked, convert temp
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
