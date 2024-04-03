import {setupTemplate} from "../components.mjs";

class IconLinkComponent extends HTMLElement {
  constructor() {
    super();
    console.log("icon-link-component constructor");
  }

  connectedCallback() {
    const url = new URL(import.meta.url);
    const shadowRoot = this.attachShadow({mode: "closed"});
    setupTemplate(url, shadowRoot).then(() => {
      // Insert link
      let linkUrl;
      if (this.hasAttribute("linkUrl")) {
        linkUrl = this.getAttribute("linkUrl");
      } else {
        linkUrl = "/images/weather-sunny.png";
      }
      shadowRoot.querySelector("#linkUrl").href = linkUrl;

      // Insert icon
      let iconUrl;
      if (this.hasAttribute("iconUrl")) {
        iconUrl = this.getAttribute("iconUrl");
      } else {
        iconUrl = "/images/weather-sunny.png";
      }
      shadowRoot.querySelector("#iconUrl").src = iconUrl;
    });
    console.log("icon-link-component connectedCallback");
  }
}

export {IconLinkComponent};
