/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const { Builder, By, until } = require("selenium-webdriver");

const isDocStateComplete = async () => {
    let readyState = await DRIVER.executeScript("return document.readyState");
    return readyState.toString() === "complete";
};

const scrollToBottom = async () => {
    await DRIVER.executeScript("window.scrollBy(0,document.body.scrollHeight)");
};
const checkUrlContainsValues = async (queryParams = []) => {
    let currentUrl = await DRIVER.getCurrentUrl();
    return queryParams.every((param) => currentUrl.includes(param));
};

const checkWindowCount = async (count) => {
    let handles = await DRIVER.getAllWindowHandles();
    return handles.length === count;
};

function switchToFrame(index) {
    return DRIVER.wait(until.ableToSwitchToFrame(index), TIME);
}

async function waitForDocStateComplete() {
    return DRIVER.wait(() => isDocStateComplete());
}

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

async function switchToCurrentWindow() {
    let windowHandles = await DRIVER.getAllWindowHandles();
    if (windowHandles.length > 0) {
        let handle = windowHandles[windowHandles.length - 1];
        return DRIVER.switchTo().window(handle);
    }
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

async function waitForUrlContainsValue(value) {
    return waitForUrlContainsValues([value]);
}

async function waitForUrlContainsValues(queryParams = []) {
    return DRIVER.wait(() => checkUrlContainsValues(queryParams), TIME);
}

module.exports = {
    waitForWindowCount,
    loadNewPage,
    maximizeWindow,
    switchToCurrentWindow,
    switchToFrame,
    switchToDefaultContent,
    waitForUrlContainsValue,
    waitForUrlContainsValues,
    waitForDocStateComplete,
    scrollToBottom,
};
