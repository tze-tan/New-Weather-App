function handleSearchInput(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let searchInput = document.querySelector("#search-input");
  cityName.innerHTML = searchInput.value;
  let apiKey = "4916caba061520co8b34c1aft75528fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;
  console.log(apiUrl);
}

let searchFormElement = document.querySelector("#search-component");
searchFormElement.addEventListener("submit", handleSearchInput);
