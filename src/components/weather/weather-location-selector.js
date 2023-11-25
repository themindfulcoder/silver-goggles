function saveWeatherLocationSelector(val) {
  localStorage.setItem("silver-goggles-weatherlocation", val);
}

let weatherLocationSelectorElement = document.getElementById(
  "weather-location-selector-input"
);

weatherLocationSelectorElement.onblur = (ev) => {
  var value = ev.srcElement.value;
  saveWeatherLocationSelector(value);
};

weatherLocationSelectorElement.onkeyup = (ev) => {
  if (ev.keyCode != 13) {
    return;
  }
  var value = ev.srcElement.value;
  saveWeatherLocationSelector(value);
};
