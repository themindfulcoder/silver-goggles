import { setupTemplate } from "../components.mjs";

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
      // TODO: real api call
      const apiResponse = { temp: "21", conditions: "sunny" };

      /* handle temp */
      const tempElement = shadowRoot.getElementById("temp");
      tempElement.innerHTML = apiResponse.temp;

      /* handle icon */
      const iconElement = shadowRoot.getElementById("icon");
      const iconImgElement = document.createElement("img");
      iconImgElement.src = `/images/weather-${apiResponse.conditions}.png`;
      iconElement.replaceChildren(iconImgElement);

      // TODO: 5min timer or something to update weather conditions
      //   const timeIntervalHandleId = setInterval(updateTime(timeElement), 1e3);
      //   onunload += () => {
      //     clearInterval(timeIntervalHandleId);
      //   };
    });
  }
}

export { WeatherComponent };
