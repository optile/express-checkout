const { Builder, By } = require("selenium-webdriver");
const { getElement, waitForElement } = require("../services/locatingStrategy");
const BASE_URL = "http://localhost:3000/demo/dist/";

const expressCheckoutTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await waitForElement("[test-id=payments-container-1]");
    });

    beforeEach(async () => {
        await DRIVER.sleep(2000);
    });

    it("Check if Payments Container is Displayed", async () => {
        await getElement("[test-id=payments-container-1]").isDisplayed();
    });

    it("Check if PayPal Container is Displayed", async () => {
        await getElement("[test-id=paypal-button-container-1]").isDisplayed();
    });

    it("Check if PayPal Button is Displayed", async () => {
        await getElement(".paypal-button-container.paypal-button-container-1").isDisplayed();
    });
};
module.exports = expressCheckoutTests;
