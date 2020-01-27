const {By,until} = require("selenium-webdriver");

function getElement(element) { 
    return DRIVER.wait(until.elementLocated(By.css(element)), TIME);
}

module.exports = {getElement}