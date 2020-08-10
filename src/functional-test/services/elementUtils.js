const { Builder, By, until } = require('selenium-webdriver');

function getElement(cssId) {
    return DRIVER.wait(until.elementLocated(By.css(cssId)), TIME);
}

// function getElementValue(element) {
//     return DRIVER.executeScript('return arguments[0].value', element);
// }

// function getXPathElement(xpathId) {
//     return DRIVER.wait(until.elementLocated(By.xpath(xpathId)), TIME);
// }

// function getElements(cssId) {
//     return DRIVER.findElements(By.css(cssId));
// }

// function waitForElement(cssId) {
//     return getElement(cssId);
// }

// function waitForEnabledElement(cssId) {
//     return getEnabledElement(cssId);
// }

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

// returns promise of getText
// async function getElementText(cssId) {
//     let element = await getElement(cssId);
//     return element.getText();
// }

// returns promise of getElementValue
// async function getXPathElementValue(xpathId) {
//     let element = await getXPathElement(xpathId);
//     return getElementValue(element);
// }

// returns promise of the click event
// async function clickElement(cssId) {
//     let element = await getElement(cssId);
//     return element.click();
// }

// returns promise of the click call
async function clickEnabledElement(cssId) {
    let element = await getEnabledElement(cssId);
    return element.click();
}

// returns promise of the click call
// async function clickVisibleXPathElement(xpathId) {
//     let element = await getVisibleXPathElement(xpathId);
//     return element.click();
// }

// returns promise of the sendKeys call
async function sendKeysToVisibleElement(cssId, text) {
    let element = await getVisibleElement(cssId);
    return element.sendKeys(text);
}

// returns promise of the sendKeys call
// async function sendKeysToVisibleXPathElement(xpathId, text) {
//     let element = await getVisibleXPathElement(xpathId);
//     return element.sendKeys(text);
// }

// this is a blocking call
async function expectVisibleElement(cssId) {
    let element = await getVisibleElement(cssId);
    let displayed = await element.isDisplayed();
    expect(displayed).toBeTruthy();
}

// this is a blocking call
// async function expectElementText(cssId, text) {
//     let validationText = await getElementText(cssId);
//     expect(validationText).toStrictEqual(text);
// }

// this is a blocking call
// async function expectElementValue(cssId, value) {
//     let element = await getElement(cssId);
//     let validationValue = await getElementValue(element);
//     expect(validationValue).toStrictEqual(value);
// }

// this is a blocking call
// async function expectXPathElementValue(xpathId, value) {
//     let validationValue = await getXPathElementValue(xpathId);
//     expect(validationValue).toStrictEqual(value);
// }

// this is a blocking call
// async function expectVisibleXPathElement(xpathId) {
//     let element = await getXPathElement(xpathId);
//     await DRIVER.wait(until.elementIsVisible(element), TIME);
//     let displayed = await element.isDisplayed();
//     expect(displayed).toBeTruthy();
// }

module.exports = {
    getElement,
   
    waitForVisibleElement,

    getVisibleElement,
    getVisibleXPathElement,
    getEnabledElement,
 
    expectVisibleElement,
   
    clickEnabledElement,
    
    sendKeysToVisibleElement,
    
};