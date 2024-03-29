function updateWeather(response) {
  let tempElement = document.querySelector("#temp-value");
  let theTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="temp-icon"/>`;

  tempElement.innerHTML = Math.round(theTemp);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/hr`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue","Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "a39to9848ebf1032a3bb6a0b1f2641cd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function getForecast(city) {
  let apiKey = "a39to9848ebf1032a3bb6a0b1f2641cd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data)
  let forecastElement = document.querySelector("#forecast");

  
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {

    if (index < 5){
    forecastHTML =
      forecastHTML +
      `
  <div class="weather-forecast-days">
    <div class="day">${formatDay(day.time)}</div>
    <img
      src="${day.condition.icon_url}"
      alt=""
      width="88"
      height="88"
    />
    <div class="weather-forecast-temperature">
      <span class="temperature-max">${Math.round(
        day.temperature.maximum
      )}°</span>
      <span class="temperature-min">${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
  </div>
  `;
  }
  });
  forecastElement.innerHTML = forecastHTML;
}
function handleSearch(event) {
  event.preventDefault();
  let searchBarElement = document.querySelector("#search-bar");

  searchCity(searchBarElement.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Miami");

