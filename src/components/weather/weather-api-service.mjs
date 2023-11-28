const weatherApiService = {
  getWeather: async () => {
    const weatherLocation = localStorage.getItem(
      "silver-goggles-weatherlocation"
    );
    const weatherApiKey = localStorage.getItem("silver-goggles-weatherapikey");

    if (
      !weatherLocation ||
      weatherLocation === "" ||
      !weatherApiKey ||
      weatherApiKey === ""
    ) {
      return { temp: "21", condition: "sunny" }; // TODO: temp return value
      return undefined;
    }

    const result = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${weatherLocation}`
    );
    return {
      temp: result.temp_c,
      condition: result["condition:text"],
      feelslike: result.feelslike_c,
    };
  },
};

export { weatherApiService };
