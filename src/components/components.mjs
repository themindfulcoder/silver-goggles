import { DateTimeComponent } from "./datetime/datetime-component.mjs";
import { IconLinkComponent } from "./icon-link/icon-link-component.mjs";

const setupTemplate = async function (url, shadowRoot) {
  const componentName =
    url.pathname.split("/")[url.pathname.split("/").length - 2];
  const directory = url.pathname.substring(0, url.pathname.lastIndexOf("/"));
  const baseUrl = `${url.origin}${directory}`;
  const htmlUrl = `${baseUrl}/${componentName}-template.html`;
  const cssUrl = `${baseUrl}/${componentName}-style.css`;
  const html = await fetch(htmlUrl).then((resp) => {
    console.log(resp);
    return resp.text();
  });
  const css = await fetch(cssUrl).then((resp) => resp.text());

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
  window.customElements.define("icon-link", IconLinkComponent);
};

export { setupTemplate, registerComponents };
