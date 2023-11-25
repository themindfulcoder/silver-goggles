import { DateTimeElement } from "./components/datetime/component.mjs";
window.customElements.define("date-time-component", DateTimeElement);

// const app = {
//   /** locale configuration */
//   locale: {
//     /**
//      * supported locale codes
//      * @returns {string[]}
//      */
//     get supportedLocaleCodes() {
//       return this._supportedCodes
//         ? this._supportedCodes
//         : (this._supportedCodes = ["en-NL", "nl-NL", "en-US"]);
//     },
//     /**
//      * time format using supported locale codes
//      * @returns {Intl.DateTimeFormat}
//      */
//     get timeFormat() {
//       return this._timeFormat
//         ? this._timeFormat
//         : (this.timeFormat = new Intl.DateTimeFormat(
//             this.supportedLocaleCodes,
//             {
//               hour: "2-digit",
//               minute: "2-digit",
//               timeZoneName: "short",
//               hour12: false,
//             }
//           ));
//     },
//     /** date format using supported locale codes
//      * @returns {Intl.DateTimeFormat}
//      */
//     get dateFormat() {
//       return this._dateFormat
//         ? this._dateFormat
//         : (this._dateFormat = new Intl.DateTimeFormat(
//             this.supportedLocaleCodes,
//             {
//               month: "long",
//               day: "2-digit",
//               year: "numeric",
//               weekday: "long",
//             }
//           ));
//     },
//   },

//   /** navigation helper */
//   navigate: {
//     /**
//      * static collection of application page routes
//      */
//     get _pages() {
//       return Object.freeze({
//         errorPage: "/pages/error.html",
//       });
//     },
//     /**
//      * navigates the window to the error page
//      */
//     toErrorPage() {
//       window.location = this._pages.errorPage;
//     },
//   },

//   /** widgets helper */
//   widgets: {},
//   addWidget(name, elementId, componentName) {
//     async function replaceElementChildrenWithComponent(element, componentName) {
//       let htmlResponse = await fetch(
//         `/components/${componentName}/${componentName}.html`
//       );
//       let htmlText = await htmlResponse.text();
//       element.innerHTML = htmlText;

//       let jsResponse = await fetch(
//         `/components/${componentName}/${componentName}.js`
//       );
//       let jsText = await jsResponse.text();
//       let jsElem = document.createElement("script");
//       jsElem.type = "module";
//       jsElem[jsElem.innerText === undefined ? "textContent" : "innerText"] =
//         jsText;
//       element.appendChild(jsElem);
//     }

//     this.widgets[name] = {
//       element: document.getElementById(elementId),
//       componentName: componentName,
//       async load() {
//         await replaceElementChildrenWithComponent(
//           this.element,
//           this.componentName
//         );
//       },
//     };
//     return this.widgets[name];
//   },
//   start() {
//     try {
//       // this.addWidget("datetime", "datetime", "datetime");
//       // this.addWidget("weather", "weather", "weather");

//       Object.keys(this.widgets).forEach((value) => {
//         this.widgets[value].load();
//       });
//     } catch (ex) {
//       console.log(ex);
//       this.navigate.toErrorPage();
//     }
//   },
// };

// /* start the app */
// app.start();

// // async function updateWeather(elem) {
// //   replaceElementChildrenWithComponent(
// //     elem,
// //     "/components/weather/weather-location-selector"
// //   );
// // }

// // updateWeather(weatherElem);

// // app.updateTime();
