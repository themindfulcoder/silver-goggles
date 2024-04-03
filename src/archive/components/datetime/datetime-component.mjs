import {locale} from "../../locale.mjs";
import {setupTemplate} from "../components.mjs";

class DateTimeComponent extends HTMLElement {
  constructor() {
    super();
    console.log("date-time-component constructor");
  }

  connectedCallback() {
    console.log("date-time-component connectedCallback");
    const url = new URL(import.meta.url);
    const shadowRoot = this.attachShadow({mode: "closed"});
    setupTemplate(url, shadowRoot).then(() => {
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
      const timeIntervalHandleId = setInterval(updateTime(timeElement), 1e3);
      onunload += () => {
        clearInterval(timeIntervalHandleId);
      };
    });
  }
}

export {DateTimeComponent};
