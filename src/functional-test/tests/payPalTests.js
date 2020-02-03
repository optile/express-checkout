const { Builder, By } = require("selenium-webdriver");
const { getElement, waitForElement } = require("../services/locatingStrategy");
import "babel-polyfill";
const BASE_URL = "https://optile.github.io/express-checkout/";

const payPalTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await waitForElement("[test-id='payments-container']");
    });

    beforeEach(async () => {
        await DRIVER.sleep(2000);
    });

    it("Check if Payments Container is Displayed", async () => {
        await getElement("[test-id='payments-container']").isDisplayed();
    });

    it("Check if PayPal Container is Displayed", async () => {
        await getElement("[test-id='paypal-button-container']").isDisplayed();
    });

    it("Check if PayPal Button is Displayed", async () => {
        await DRIVER.switchTo().frame(0);
        await getElement(".paypal-button").isDisplayed();
    });
};
module.exports = payPalTests;
