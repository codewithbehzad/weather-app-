const cityInput = document.getElementById("cityInput");
const addInput = document.getElementById("add");
const cityOutput = document.getElementById("cityoutput");
const descOutput = document.getElementById("description");
const tempOutput = document.getElementById("temp");
const windOutput = document.getElementById("wind");

// my API KEY
const apiKey = "b03e7012a54396ba90ab6d5257350f92";

// convert to celsius
function convertToCel(value) {
  return (value - 273).toFixed(2);
}

async function getWeather() {
  let weatherResult = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`
    )
  ).json();
  setInfo(weatherResult);
}

function setInfo(data) {
  let cityName = data["name"];
  let description = data["weather"][0]["description"];
  let temp = data["main"]["temp"];
  let wind = data["wind"]["speed"];

  // append to DOM
  cityOutput.innerHTML = `City : ${cityName}`;
  descOutput.innerHTML = `Descriptions : ${description}`;
  tempOutput.innerHTML = `Temperature : ${convertToCel(temp)} C`;
  windOutput.innerHTML = `Wind Speed : ${wind} km/h`;
  document.getElementById(
    "icon"
  ).src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

// Events
addInput.addEventListener("click", getWeather);
