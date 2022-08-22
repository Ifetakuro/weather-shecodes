// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20
//   }
// };

// // write your code here

// let city = prompt("Enter a city?");
// city = city.toLowerCase();

// if (weather[city]) {
//   let temp = Math.round(weather[city].temp);
//   let fah = Math.round((temp * 9) / 5 + 32);
//   let humidity = Math.round(weather[city].humidity);
//   alert(
//     `It is currently ${temp}°C (${fah}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

let form = document.querySelector(".form");
let input = document.querySelector("input");
let cityName = document.querySelector(".city-name");

let celsuis = document.querySelector(".celsuis");
let fahrenheit = document.querySelector(".fahrenheit");
let bigDeg = document.querySelector(".big-deg");
let weatherDesc = document.querySelector(".weather-desc");
let humidity = document.querySelector(".humidity");

let fullDate = document.querySelector(".full-date");
let locationButton = document.querySelectorAll(".location");
let geoLoc = document.querySelector(".geo");
let wind = document.querySelector(".wind");
console.log(locationButton);

//get weather
function getResponse(res) {
  let temp = Math.round(res.data.main.temp);
  let city = res.data.name;
  let description = res.data.weather[0].description;
  let hum = res.data.main.humidity;
  let windSpeed = Math.round(res.data.wind.speed);
  console.log(res, temp, city, description, hum, windSpeed);

  cityName.innerHTML = city;
  bigDeg.innerHTML = temp;
  weatherDesc.innerHTML = description;
  humidity.innerHTML = `${hum}%`;
  wind.innerHTML = `${windSpeed}km/h`;

  celsuis.addEventListener("click", () => {
    bigDeg.innerHTML = temp;
  });
  fahrenheit.addEventListener("click", () => {
    let temperature = Math.round((9 * temp + 160) / 5);
    bigDeg.innerHTML = temperature;
  });
}

function getWeather(e, city) {
  e.preventDefault();
  cityName.innerHTML = "Loading";
  let apiKey = "70e9b52def752137ef9e428bacedc97a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const axios = require("axios").default;
  axios.get(url).then(getResponse);
  input.value = "";
}

function getInputweather(e) {
  let city = input.value;
  console.log(city);
  getWeather(e, city);
}
form.addEventListener("submit", getInputweather);

//get based on clicking the buttons
locationButton.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let city = elem.textContent;
    getWeather(e, city);
  });
});
//get weather based on geolation
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);
  let apiKey = "70e9b52def752137ef9e428bacedc97a";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const axios = require("axios").default;
  axios.get(url).then(getResponse);
}

geoLoc.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(showLocation);
});

//get current day and time
let date = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = day[date.getDay()];
let hour = date.getHours();
let min = date.getMinutes();

fullDate.innerHTML = `${currentDay}, ${hour}:${min}`;

// covert celsuis and farenheit
let bigDegValue = +bigDeg.textContent;
function cToF(c) {
  let temp = Math.round((9 * bigDegValue + 160) / 5);
  bigDeg.innerHTML = temp;
}
function fToC(f) {
  bigDeg.innerHTML = bigDegValue;
}

celsuis.addEventListener("click", fToC);
fahrenheit.addEventListener("click", cToF);
