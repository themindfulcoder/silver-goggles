const RandomQuoteService = function () {
  const obj = {};
  const path = "https://gist.githubusercontent.com/themindfulcoder/03d2ccbfde890178d8daac17d049a279/raw/cd81b151b08ae396885d5d30aaf4d0d0b1b10f2e/craftmanship.json";
  fetch(path)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      obj.items = json;
    });
  obj.items = [];
  obj.currentIndex = 0;
  obj.currentItem = {};
  obj.getRandomQuote = function () {
    obj.currentIndex = Math.floor(Math.random() * obj.items.length);
    obj.currentItem = obj.items[obj.currentIndex];
    return obj.currentItem;
  };
  return obj;
}

const TimeModule = function (randomQuoteService) {
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
  obj.updateQuote = function () {
    const updateTitleElement = function (text) {
      document.getElementById('time.quote.title').textContent = text;
    };
    const updateSubtitleElement = function (text) {
      document.getElementById('time.quote.subtitle').textContent = text;
    };

    const item = randomQuoteService.getRandomQuote();
    updateTitleElement(item.title);
    updateSubtitleElement(item.subtitle);
  };
  obj.updateTimeIntervalId = 0;
  obj.updateWeatherIntervalId = 0;
  obj.updateQuoteIntervalId = 0;
  obj.start = function () {
    // update the view
    obj.updateTime();
    obj.updateWeather();
    obj.updateQuote();

    // setup schedules
    const oneSecond = 1000;
    const fiveMinutes = 1000 * 60 * 5;
    const thirtyMinutes = 1000 * 60 * 30;
    obj.updateTimeIntervalId = setInterval(obj.updateTime, oneSecond);
    obj.updateWeatherIntervalId = setInterval(obj.updateWeather, thirtyMinutes);
    obj.updateQuoteIntervalId = setInterval(obj.updateQuote, fiveMinutes);
  }
  obj.stop = function () {
    clearInterval(obj.updateTimeIntervalId);
    clearInterval(obj.updateWeatherIntervalId);
    clearInterval(obj.updateQuoteIntervalId);
  }
  return obj;
}
const randomQuoteService = RandomQuoteService();
const timeModule = TimeModule(randomQuoteService);

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
