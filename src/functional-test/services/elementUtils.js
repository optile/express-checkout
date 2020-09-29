const { Builder, By, until } = require("selenium-webdriver");

function getElement(cssId) {
    return DRIVER.wait(until.elementLocated(By.css(cssId)), TIME);
}

function waitForVisibleElement(cssId) {
    return getVisibleElement(cssId);
}

// returns promise of elementIsVisible
async function getVisibleXPathElement(xpathId) {
    let element = await getXPathElement(xpathId);
    return DRIVER.wait(until.elementIsVisible(element), TIME);
}

// returns promise of elementIsEnabled
async function getEnabledElement(cssId) {
    let element = await getElement(cssId);
    return DRIVER.wait(until.elementIsEnabled(element), TIME);
}

// returns promise of elementIsVisible
async function getVisibleElement(cssId) {
    let element = await getElement(cssId);
    return DRIVER.wait(until.elementIsVisible(element), TIME);
}

// returns promise of the click call
async function clickEnabledElement(cssId) {
    let element = await getEnabledElement(cssId);
    return element.click();
}

// returns promise of the sendKeys call
async function sendKeysToVisibleElement(cssId, text) {
    let element = await getVisibleElement(cssId);
    return element.sendKeys(text);
}

// returns promise of the sendKeys call
async function clearAndSendKeysToVisibleElement(cssId, text) {
    let element = await getVisibleElement(cssId);
    await element.clear();
    return element.sendKeys(text);
}

// this is a blocking call
async function expectVisibleElement(cssId) {
    let element = await getVisibleElement(cssId);
    let displayed = await element.isDisplayed();
    expect(displayed).toBeTruthy();
}

module.exports = {
    getElement,
    waitForVisibleElement,
    getVisibleElement,
    getVisibleXPathElement,
    getEnabledElement,
    expectVisibleElement,
    clickEnabledElement,
    sendKeysToVisibleElement,
    clearAndSendKeysToVisibleElement
};
