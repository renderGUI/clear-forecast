// GLOBAL VARIABLES
const inputField = document.getElementById("input-field");
const searchButton = document.getElementById("search-button");
const weatherOuput = document.getElementById("weather-output");
const cityOutput = document.getElementById("city-output");
const conditionsOutput = document.getElementById("conditions-output");

const API_KEY = "ENTER YOUR KEY HERE";

// FUNCTION FOR RETRIEVING LOCATION KEY BASED ON ENTERED CITY
async function getCurrentWeather() {
  const enteredCity = inputField.value;

  if (!enteredCity) {
    console.error("Input field cannot be left empty!");
    return;
  }

  let baseEndpoint = new URL("https://api.openweathermap.org/data/2.5/weather");

  baseEndpoint.searchParams.set("q", enteredCity);
  baseEndpoint.searchParams.set("units", "imperial");
  baseEndpoint.searchParams.set("appid", API_KEY);
  const endpoint = baseEndpoint.toString();

  const response = await fetch(endpoint);
  const data = response.json();
  return data

    .then((data) => {
      const weatherInformation = {
        city: data.name,
        temperature: data.main.temp,
        conditions: data.weather[0].description,
      };
      return weatherInformation;
    })
    .then((returnedWeatherInformation) => {
      cityOutput.textContent = `${returnedWeatherInformation.city}`;
      weatherOuput.textContent = `${returnedWeatherInformation.temperature.toFixed(0)}°`;
      conditionsOutput.textContent = `${returnedWeatherInformation.conditions}`;
    });
}

searchButton.addEventListener("click", getCurrentWeather);
