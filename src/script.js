// main function to get the current values for the city and then display/replace them on UI
function hollisticSearch(city) {
  let apiKey = "4916caba061520co8b34c1aft75528fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(replaceDescription);
  axios.get(apiUrl).then(replaceTemperature);
  axios.get(apiUrl).then(replaceDateTime);
  axios.get(apiUrl).then(replaceImage);
}

// use Munich as a default location to display current temperatures on load
hollisticSearch("Munich");

let searchFormElement = document.querySelector("#search-component");
searchFormElement.addEventListener("submit", handleSearchInput);

// take search input value and run a hollistic search on it to get the current values
function handleSearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  hollisticSearch(searchInput.value);
  getForecast(searchInput.value);
}

// function to get and replace description such as windspeed and humidity
function replaceDescription(response) {
  let apiCity = response.data.city;
  let apiWindSpeed = `${response.data.wind.speed}km/h`;
  let apiHumidity = `${response.data.temperature.humidity}%`;
  let apiDescription = response.data.condition.description;

  let cityName = document.querySelector("#city");
  let windSpeed = document.querySelector("#windspeed");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");

  cityName.innerHTML = apiCity;
  windSpeed.innerHTML = apiWindSpeed;
  humidity.innerHTML = apiHumidity;
  description.innerHTML = apiDescription;
}

// function to get and replace datetime based on API response time (not location based datetime)
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

// function to get and replace temperature in celcius
function replaceTemperature(response) {
  let apiTemperature = Math.round(response.data.temperature.current);

  let currentTemperature = document.querySelector("#current-temperature");

  currentTemperature.innerHTML = `${apiTemperature}`;
}

// function to get and replace icons on current temperature
function replaceImage(response) {
  let image = document.querySelector("#temp-image");
  image.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-image" />`;
  console.log(image.innerHTML);
}

// function to get Forecast data based on a specific city input
function getForecast(city) {
  apiKey = "4916caba061520co8b34c1aft75528fb";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

// function to transform forecast timestamp from API to human readable 3-letter Days
function transformForecastTime(time) {
  let formattedForecastTime = new Date(time * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastDay = days[formattedForecastTime.getDay()];

  return forecastDay.slice(0, 3);
}

// main function to get and display forecast - called by getForecast function
function displayForecast(response) {
  let HTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      HTML =
        HTML +
        ` <div class="weather-forecast" id="weather-forecast">
    <div class="weather-forecast-day">${transformForecastTime(day.time)}</div>
    <img
      src="${day.condition.icon_url}"
      class="weather-forecast-icon"
    />
    <div class="weather-forecast-temp">
      <strong>${Math.round(day.temperature.maximum)}°</strong>
      ${Math.round(day.temperature.minimum)}°
    </div>
  </div>`;
    }
  });

  let weatherForecast = document.querySelector("#weather-forecast-container");
  weatherForecast.innerHTML = HTML;
}

// Use Munich as a default location to display forecast on load
getForecast("Munich");
