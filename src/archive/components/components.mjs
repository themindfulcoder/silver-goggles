import {DateTimeComponent} from "./datetime/datetime-component.mjs";
import {IconLinkComponent} from "./icon-link/icon-link-component.mjs";
import {WeatherComponent} from "./weather/weather-component.mjs";

const handleError = function (componentName, response) {
  if (!response.ok) {
    throw new Error(`Component ${componentName} failed to load.`);
  }
  return response;
};

const setupTemplate = async function (url, shadowRoot) {
  const componentName =
    url.pathname.split("/")[url.pathname.split("/").length - 2];
  const directory = url.pathname.substring(0, url.pathname.lastIndexOf("/"));
  const baseUrl = `${url.origin}${directory}`;
  const htmlUrl = `${baseUrl}/${componentName}-template.html`;
  const cssUrl = `${baseUrl}/${componentName}-style.css`;
  const html = await fetch(htmlUrl)
    .then((resp) => handleError(componentName, resp))
    .then((resp) => resp.text());
  const css = await fetch(cssUrl)
    .then((resp) => handleError(componentName, resp))
    .then((resp) => resp.text());

  const parser = new DOMParser();
  const template = parser
    .parseFromString(html, "text/html")
    .querySelector("template");

  const style = document.createElement("style");
  style.textContent = css;
  template.content.prepend(style);

  shadowRoot.appendChild(document.importNode(template.content, true));
};

const registerComponents = async function () {
  window.customElements.define("date-time-component", DateTimeComponent);
  window.customElements.define("icon-link-component", IconLinkComponent);
  window.customElements.define("weather-component", WeatherComponent);
};

export {setupTemplate, registerComponents};
