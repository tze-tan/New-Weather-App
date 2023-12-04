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
  axios.get(apiUrl).then(replaceImage);
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

  let hour = formattedDateTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = formattedDateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[formattedDateTime.getDay()];

  let time = document.querySelector("#time");
  let dayInTheWeek = document.querySelector("#dayintheweek");

  time.innerHTML = `${hour}:${minutes}`;
  dayInTheWeek.innerHTML = day;
}

function replaceTemperature(response) {
  let apiTemperature = Math.round(response.data.temperature.current);

  let currentTemperature = document.querySelector("#current-temperature");

  currentTemperature.innerHTML = `${apiTemperature}`;
}

function replaceImage(response) {
  let image = document.querySelector("#temp-image");
  image.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-image" />`;
  console.log(image.innerHTML);
}

let searchFormElement = document.querySelector("#search-component");
searchFormElement.addEventListener("submit", handleSearchInput);
