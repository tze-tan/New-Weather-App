function handleSearchInput(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let searchInput = document.querySelector("#search-input");
  cityName.innerHTML = searchInput.value;
  let apiKey = "4916caba061520co8b34c1aft75528fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;
  axios.get(apiUrl).then(replaceDescription);
  axios.get(apiUrl).then(replaceTemperature);
  axios.get(apiUrl).then(replaceDateTime);
}

function replaceDescription(response) {
  let apiWindSpeed = `${response.data.wind.speed}km/h`;
  let apiHumidity = `${response.data.temperature.humidity}%`;
  let apiDescription = response.data.condition.description;

  let windSpeed = document.querySelector("#windspeed");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");

  windSpeed.innerHTML = apiWindSpeed;
  humidity.innerHTML = apiHumidity;
  description.innerHTML = apiDescription;
}

function replaceDateTime(response) {
  let apiTime = response.data.time;
  let formattedDateTime = new Date(apiTime * 1000);
  console.log(formattedDateTime);

  let hour = formattedDateTime.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = formattedDateTime.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = document.querySelector("#time");

  time.innerHTML = `${hour}:${minutes}`;
}

function replaceTemperature(response) {
  let apiTemperature = Math.round(response.data.temperature.current);

  let currentTemperature = document.querySelector("#current-temperature");

  currentTemperature.innerHTML = `${apiTemperature}°C`;
}

let searchFormElement = document.querySelector("#search-component");
searchFormElement.addEventListener("submit", handleSearchInput);
