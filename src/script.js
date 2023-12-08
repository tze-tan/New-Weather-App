function hollisticSearch(city) {
  let apiKey = "4916caba061520co8b34c1aft75528fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(replaceDescription);
  axios.get(apiUrl).then(replaceTemperature);
  axios.get(apiUrl).then(replaceDateTime);
  axios.get(apiUrl).then(replaceImage);
}

hollisticSearch("Munich");

let searchFormElement = document.querySelector("#search-component");
searchFormElement.addEventListener("submit", handleSearchInput);

function handleSearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  hollisticSearch(searchInput.value);
}

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

/*function displayForecast() {
  let HTML = "";

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];

  days.forEach(function (day) {
    HTML =
      HTML +
      ` <div class="weather-forecast-day">${day}</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
              class="weather-forecast-icon"
            />
            <div class="weather-forecast-temp">
              <strong>19°</strong>
              15°
            </div>`;

    console.log(HTML);
  });
}*/

/*let weatherForecast = document.querySelector("#weather-forecast");
weatherForecast.innerHTML = `<div class="weather-forecast-day">Fri</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
              class="weather-forecast-icon"
            />
            <div class="weather-forecast-temp">
              <strong>19°</strong>
              15°
            </div>`;*/

//displayForecast();
