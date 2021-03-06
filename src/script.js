//Date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Show Week days
  let day = days[now.getDay()];
  let h2 = document.querySelector("#week-day");
  if (day.length >= 7) {
    h2.style.fontSize = "22px";
  }
  h2.innerHTML = `${day}`;
  return `${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Search City
function searchCity(city) {
  let apiKey = "c49628baf9d6b437894e48a3b6469899";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast-container");

  let forecastHTML = `<div class="weather-forecast" id="forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="row forecast-row">
        <div class=" weather-forcast-days"><h6>${formatDay(
          forecastDay.dt
        )}</h6></div>
              <div class="temp-max" aria-label="max temp">${Math.round(
                forecastDay.temp.max
              )}°</div>
              <div class="temp-min" aria-label="min temp">${Math.round(
                forecastDay.temp.min
              )}°</div>
              <span class="icon">
                <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                
                class="forecast-img"

                alt="${forecastDay.weather[0].main}"
                />
              </span>
              <div class="forecast-description">${
                forecastDay.weather[0].main
              }</div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c49628baf9d6b437894e48a3b6469899";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Show City Temperature
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#current-weather-discription").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

// Current Location & Button
function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=c49628baf9d6b437894e48a3b6469899`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#img-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Basel");
