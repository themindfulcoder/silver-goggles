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

    const apiResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${weatherLocation}`
    );
    const apiResponseJson = await apiResponse.json();

    const result = {
      temp: apiResponseJson.current.temp_c,
      condition: apiResponseJson.current.condition.text,
      feelslike: apiResponseJson.current.feelslike_c,
      iconUrl: `https:${apiResponseJson.current.condition.icon}`,
    };

    return result;
  },
};

export { weatherApiService };
