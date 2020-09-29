const { Builder, By, until } = require("selenium-webdriver");

const checkUrlTitle = async title => {
    let currentUrl = await DRIVER.getCurrentUrl();
    return currentUrl.includes(title);
};

const switchToWindow = async handle => {
    await DRIVER.switchTo().window(handle);
};

const checkWindowCount = async count => {
    let handles = await DRIVER.getAllWindowHandles();
    return handles.length === count;
};

function switchToFrame(index) {
    return DRIVER.wait(until.ableToSwitchToFrame(index), TIME);
};

async function loadNewPage() {
    try {
        let url = "http://localhost:3000/";
        return DRIVER.get(url);
    } catch (error) {
        console.log(error);

        // If the process needs to be terminated instead of returning a rejected Promise
        // then comment the return Promise line and uncomment the process.exit line.
        return Promise.reject(error);
        //process.exit(1);
    }
}

async function maximizeWindow() {
    let window = DRIVER.manage().window();
    return window.maximize();
}

async function switchToNextWindow() {
    return DRIVER.getAllWindowHandles().then(handles => switchToWindow(handles.pop()));
}

async function waitForWindowCount(count) {
    return DRIVER.wait(() => checkWindowCount(count));
}

async function waitForUrlTitle(title) {
    return DRIVER.wait(() => checkUrlTitle(title));
}

function switchToDefaultContent() {
    return DRIVER.switchTo().defaultContent();
}

const checkUrlContainsValue = async (value1, value2) => {
    let currentUrl = await DRIVER.getCurrentUrl();
    return currentUrl.includes(value1, value2);
};

async function waitForUrlContainsValues(value1, value2) {
    return DRIVER.wait(() => checkUrlContainsValue(value1, value2), TIME);
}


module.exports = {
    checkUrlTitle,
    waitForWindowCount,
    loadNewPage,
    maximizeWindow,
    waitForUrlTitle,
    switchToNextWindow,
    switchToFrame,
    switchToDefaultContent,
    waitForUrlContainsValues
};
