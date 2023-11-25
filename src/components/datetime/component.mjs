import { locale } from "../../locale.mjs";

class DateTimeElement extends HTMLElement {
  constructor() {
    super();
    console.log("date time element constructor");
  }

  connectedCallback() {
    const url = new URL(import.meta.url);
    const directory = url.pathname.substring(0, url.pathname.lastIndexOf("/"));
    const baseUrl = `${url.origin}${directory}`;
    Promise.all([
      fetch(`${baseUrl}/template.html`).then((resp) => resp.text()),
      fetch(`${baseUrl}/style.css`).then((resp) => resp.text()),
    ]).then(([html, css]) => {
      const shadowRoot = this.attachShadow({ mode: "closed" });
      const parser = new DOMParser();
      const template = parser
        .parseFromString(html, "text/html")
        .querySelector("template");
      const style = document.createElement("style");

      style.textContent = css;
      template.content.prepend(style);
      shadowRoot.appendChild(document.importNode(template.content, true));

      /* handle date */
      const dateElement = shadowRoot.getElementById("date");
      const date = new Date();
      dateElement.innerHTML = locale.dateFormat.format(date);

      /* handle time */
      const timeElement = shadowRoot.getElementById("time");
      const updateTime = function (elem) {
        elem.innerHTML = locale.timeFormat.format(new Date());
      };
      updateTime(timeElement);
      const timeIntervalHandleId = window.setInterval(
        updateTime(timeElement),
        1e3
      );
      window.onunload += () => {
        window.clearInterval(timeIntervalHandleId);
      };
    });
    console.log("date time element connectedCallback");
  }
}

export { DateTimeElement };
