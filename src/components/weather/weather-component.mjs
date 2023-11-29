import { setupTemplate } from "../components.mjs";
import { weatherApiService } from "./weather-api-service.mjs";

const setupWeatherLocation = function (shadowRoot) {
  const getWeatherLocation = function () {
    return localStorage.getItem("silver-goggles-weatherlocation");
  };
  const saveWeatherLocation = function (val) {
    localStorage.setItem("silver-goggles-weatherlocation", val);
  };
  const hideWeatherLocationWrapper = function () {
    weatherLocationWrapper.style.display = "none";
  };
  const showWeatherLocationWrapper = function () {
    weatherLocationWrapper.style.display = "block";
  };

  const weatherLocation = getWeatherLocation();
  const weatherLocationWrapper = shadowRoot.getElementById("weather-location");
  const weatherLocationInputElement = shadowRoot.getElementById(
    "weather-location-input"
  );

  hideWeatherLocationWrapper();

  if (!weatherLocation || weatherLocation === "") {
    showWeatherLocationWrapper();
  }

  weatherLocationInputElement.onblur = (ev) => {
    var value = ev.target.value;
    saveWeatherLocation(value);
    hideWeatherLocationWrapper();
  };

  weatherLocationInputElement.onkeyup = (ev) => {
    if (ev.key != "Enter") {
      return;
    }
    var value = ev.target.value;
    saveWeatherLocation(value);
    hideWeatherLocationWrapper();
  };
};

const setupWeatherApiKey = function (shadowRoot) {
  const getWeatherApiKey = function () {
    return localStorage.getItem("silver-goggles-weatherapikey");
  };
  const saveWeatherApiKey = function (val) {
    localStorage.setItem("silver-goggles-weatherapikey", val);
  };
  const hideWeatherApiKeyWrapper = function () {
    weatherApiKeyWrapper.style.display = "none";
  };
  const showWeatherApiKeyWrapper = function () {
    weatherApiKeyWrapper.style.display = "block";
  };

  const weatherApiKey = getWeatherApiKey();
  const weatherApiKeyWrapper = shadowRoot.getElementById("weather-apikey");
  const weatherApiKeyInputElement = shadowRoot.getElementById(
    "weather-apikey-input"
  );

  hideWeatherApiKeyWrapper();

  if (!weatherApiKey || weatherApiKey === "") {
    showWeatherApiKeyWrapper();
  }

  weatherApiKeyInputElement.onblur = (ev) => {
    var value = ev.target.value;
    saveWeatherApiKey(value);
    hideWeatherApiKeyWrapper();
  };

  weatherApiKeyInputElement.onkeyup = (ev) => {
    if (ev.key != "Enter") {
      return;
    }
    var value = ev.target.value;
    saveWeatherApiKey(value);
    hideWeatherApiKeyWrapper();
  };
};

class WeatherComponent extends HTMLElement {
  constructor() {
    super();
    console.log("weather-component constructor");
  }

  connectedCallback() {
    console.log("weather-component connectedCallback");
    const url = new URL(import.meta.url);
    const shadowRoot = this.attachShadow({ mode: "closed" });
    setupTemplate(url, shadowRoot).then(() => {
      /**
       * WEATHER LOCATION
       */
      setupWeatherLocation(shadowRoot);
      setupWeatherApiKey(shadowRoot);

      weatherApiService.getWeather().then((apiResponse) => {
        /* handle temp */
        const tempElement = shadowRoot.getElementById("temp");
        tempElement.innerHTML = apiResponse.temp;

        /* handle icon */
        const iconElement = shadowRoot.getElementById("icon");
        const iconImgElement = document.createElement("img");
        // iconImgElement.src = `/images/weather-${apiResponse.condition}.png`;
        iconImgElement.src = apiResponse.iconUrl;
        iconElement.replaceChildren(iconImgElement);

        // TODO: 5min timer or something to update weather conditions
        //   const timeIntervalHandleId = setInterval(updateTime(timeElement), 1e3);
        //   onunload += () => {
        //     clearInterval(timeIntervalHandleId);
        //   };
      });
    });
  }
}

export { WeatherComponent };
