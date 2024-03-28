const TimeModule = function () {
    const obj = {};
    obj.updateTimeHandler = function () {
        document.getElementById('time.displayText').textContent = new Date().toLocaleTimeString('en-NL', {hour12: false});
    };
    obj.updateTimeHandlerIntervalHandlerId = 0;
    obj.start = function () {
        obj.updateTimeHandlerIntervalHandlerId = setInterval(obj.updateTimeHandler, 1000);
    }
    obj.stop = function () {
        clearInterval(obj.updateTimeHandlerIntervalHandlerId);
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
        // container.classList.add('d-flex');
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
        // container.classList.remove('d-flex');
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

// {

//     openPage: function () {
//
//     },
//     closePage: function () {
//
//     }
// }

// let updateTimeHandlerIntervalHandler = 0;
//
// function openTimePage() {
//
// }
//
// // setInterval(updateTimeHandler, 1000);
// openTimePage();
