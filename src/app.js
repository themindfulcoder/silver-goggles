const timeElem = document.getElementById("time");
const dateElem = document.getElementById("date");
const weatherElem = document.getElementById("weather");

if (!timeElem || !dateElem || !weatherElem) {
  window.location = "/pages/error.html";
}

const timeFormat = new Intl.DateTimeFormat(["en-NL", "nl-NL", "en-US"], {
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
  hour12: false,
});
const dateFormat = new Intl.DateTimeFormat(["en-NL", "nl-NL", "en-US"], {
  month: "long",
  day: "2-digit",
  year: "numeric",
  weekday: "long",
});

function updateTime(elem) {
  elem.innerHTML = timeFormat.format(new Date());
}
updateTime(timeElem);

function updateDate(elem) {
  const date = new Date();
  console.log(dateFormat.format(date));
  elem.textContent = dateFormat.format(date);
}
updateDate(dateElem);

async function updateWeather(elem) {
  const weatherLocation = localStorage.getItem(
    "silver-goggles-weatherlocation"
  );
  if (!weatherLocation) {
    let htmlResponse = await fetch("/components/weather/weather-location-selector.html");
    let htmlText = await htmlResponse.text();
    elem.innerHTML = htmlText;
    let jsResponse = await fetch("/components/weather/weather-location-selector.js");
    let jsText = await jsResponse.text();
    let jsElem = document.createElement("script");
    jsElem[(jsElem.innerText===undefined?"textContent":"innerText")] = jsText;
    elem.appendChild(jsElem);
  } else {
    elem.innerHTML = "<div>weather should be here</div>";
  }
}
updateWeather(weatherElem);

let timeIntervalHandleId = undefined;
window.onload = () => {
  timeIntervalHandleId = setInterval(updateTime(timeElem), 1e3);
};
window.onunload = () => {
  window.clearInterval(timeIntervalHandleId);
};
