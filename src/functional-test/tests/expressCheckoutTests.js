const { Builder, By } = require("selenium-webdriver");
const { getElement, waitForElement } = require("../services/locatingStrategy");
import "babel-polyfill";
import { until } from "selenium-webdriver";
import { composeInitialProps } from "react-i18next";
const BASE_URL = "https://optile.github.io/express-checkout/?env=integration";

const expressCheckoutTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await waitForElement('[test-id=payments-container]');
    });

    beforeEach(async () => {
        await DRIVER.sleep(2000);
    });

    it("Check if Payments Container is Displayed", async () => {
        await getElement('[test-id=payments-container]').isDisplayed();
    });

    it("Check if PayPal Container is Displayed", async () => {
        await getElement('[test-id=paypal-button-container]').isDisplayed();
    });

    it("Check if PayPal Button is Displayed", async () => {
        await DRIVER.switchTo().frame(0);
        await getElement(".paypal-button").isDisplayed();
        await DRIVER.switchTo().defaultContent();
    });
};
module.exports = expressCheckoutTests;
