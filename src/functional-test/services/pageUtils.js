const { Builder, By, until } = require('selenium-webdriver');

const { getElement, clickEnabledElement, expectVisibleXPathElement } = require('../services/elementUtils');


const isDocStateComplete = async () => {
    let readyState = await DRIVER.executeScript('return document.readyState');
    return readyState.toString() === 'complete';
};

const checkUrlTitle = async title => {
    let currentUrl = await DRIVER.getCurrentUrl();
    return currentUrl.includes(title);
};



async function refreshPage() {
    let navigator = await DRIVER.navigate();
    await navigator.refresh();
    return DRIVER.wait(() => isDocStateComplete());
}





function switchToFrame(index) {
    return DRIVER.wait(until.ableToSwitchToFrame(index), TIME);
}

function switchToDefaultContent() {
    return DRIVER.switchTo().defaultContent();
}

function switchToParentFrame() {
    return DRIVER.switchTo().parentFrame();
}

async function checkWindowCount(number) {
    let windowCount = await DRIVER.getAllWindowHandles();
    return windowCount.length === number;
}

module.exports = {
    isDocStateComplete,
    refreshPage,
    switchToFrame,
    switchToDefaultContent,
    switchToParentFrame,
    checkUrlTitle,
    checkWindowCount
};