function updateWeather(response) {
  let tempElement = document.querySelector("#temp-value");
  let theTemp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(theTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}
function searchCity(city) {
  let apiKey = "a39to9848ebf1032a3bb6a0b1f2641cd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchBarElement = document.querySelector("#search-bar");

  searchCity(searchBarElement.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Miami");