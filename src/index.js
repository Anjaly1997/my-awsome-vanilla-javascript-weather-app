//display current date and time
let currentDayTime = document.querySelector("#day-time");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDayTime.innerHTML = `${days[now.getDay()]}  ${hours}:${minutes}`;

//display input city
function updateCityTempValue(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let cityName = document.querySelector("#city-name");
  let city = inputCity.value;
  let apiKey = `2980ff43226d67e53abfcdb6d457dcc8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios(apiUrl).then(updateTemp);
  cityName.innerHTML = city;
}
function updateTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
}

//current location

function showCurrentData(response) {
  let currentCity = response.data.name;
  let h1 = document.querySelector("#city-name");
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;
  h1.innerHTML = currentCity;
}
function showCurrent(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `2980ff43226d67e53abfcdb6d457dcc8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&&units=metric`;
  axios(apiUrl).then(showCurrentData);
}
function currentTempUpate() {
  navigator.geolocation.getCurrentPosition(showCurrent);
}

//event listeners
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCityTempValue);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentTempUpate);
