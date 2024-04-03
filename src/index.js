const TimeModule = function () {
  const obj = {};
  obj.updateTime = function () {
    document.getElementById('time.displayText').textContent = new Date().toLocaleTimeString('en-NL', {hour12: false});
  };
  obj.updateWeather = function () {
    const updateTextElement = function (text) {
      document.getElementById('time.weatherText').textContent = text;
    }
    const updateIconElement = function (url) {
      document.getElementById('time.weatherIcon').src = url;
    }

    const key = localStorage.getItem('weatherapikey')
    if (!key) {
      updateTextElement("The void is how it be. Feels like 8 instead of 10.");
      return;
    }
    const url = `https://api.weatherapi.com/v1/current.json?q=Wormerveer%2C%20Noord-Holland&key=${key}`
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('api request issue');

        }
        return resp.json();
      })
      .then((data) => {
        updateTextElement(`${data.current.condition.text} is how it be. Feels like ${data.current.temp_c} instead of ${data.current.feelslike_c}`);
        updateIconElement('https:' + data.current.condition.icon);
      })
      .catch(error => {
        console.error('Aww shit... here we go again: ', error);
      })
  };
  obj.updateTimeIntervalId = 0;
  obj.updateWeatherIntervalId = 0;
  obj.start = function () {
    // update the view
    obj.updateTime();
    obj.updateWeather();

    // setup schedules
    obj.updateTimeIntervalId = setInterval(obj.updateTime, 1000);
    obj.updateWeatherIntervalId = setInterval(obj.updateWeather, 1000 * 60 * 30);
  }
  obj.stop = function () {
    clearInterval(obj.updateTimeIntervalId);
    clearInterval(obj.updateWeatherIntervalId);
  }
  return obj;
}
const timeModule = TimeModule();

const page = function (id, pages) {
  const getPageContainer = function (id) {
    const containers = Array.from(document.getElementsByClassName('container-fluid'));
    const filteredContainers = containers.filter((value) => {
      const containerPageId = value.getAttribute('data-page-id');
      return containerPageId === id;
    });
    if (filteredContainers.length !== 1) {
      console.error(`Page "${id}" was not found.`);
      return undefined;
    }
    return filteredContainers[0];
  }

  const obj = {};
  obj.id = id;
  obj.pages = pages;
  obj.openPage = function () {
    console.trace(`start opening "${obj.id}" page`);
    // Close all the pages.
    for (const pagesKey in obj.pages) {
      obj.pages[pagesKey].closePage();
    }
    const container = getPageContainer(obj.id);
    container.classList.remove('d-none');
    console.trace(`checking if onOpenPage exists on "${obj.id}" page`);
    if (obj.onOpenPage) {
      console.trace(`calling onOpenPage on "${obj.id}" page`);
      obj.onOpenPage();
    }
    console.trace(`done opening "${obj.id}" page`);
  }
  obj.closePage = function () {
    console.trace(`start closing "${obj.id}" page`);
    const container = getPageContainer(obj.id);
    container.classList.add('d-none');
    console.trace(`checking if onClosePage exists on "${obj.id}" page`);
    if (obj.onClosePage) {
      console.trace(`calling onClosePage on "${obj.id}" page`);
      obj.onClosePage();
    }
    console.trace(`done closing "${obj.id}" page`);
  }
  return obj;
}
const pages = {};
pages['cards'] = page('cards', pages);
pages['time'] = page('time', pages);
pages['time'].onOpenPage = timeModule.start;
pages['time'].onClosePage = timeModule.stop;

function reset() {
  pages.cards.openPage();
}
