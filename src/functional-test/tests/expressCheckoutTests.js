const { Builder, By } = require("selenium-webdriver");
const { waitForVisibleElement, expectVisibleElement } = require("../services/elementUtils");
const BASE_URL = "http://localhost:3000/";

const expressCheckoutTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await waitForVisibleElement("[test-id=payments-container-1]");
    });

    beforeEach(async () => {
        await DRIVER.sleep(2000);
    });

    it("Check if Payments Container is Displayed", async () => {     
        await expectVisibleElement("[test-id=payments-container-1]")
    });

    it("Check if PayPal Container is Displayed", async () => {     
        await expectVisibleElement("[test-id=paypal-button-container-1]")
    });

    it("Check if PayPal Button is Displayed", async () => {
        await expectVisibleElement(".paypal-button-container.paypal-button-container-1")
    });
};
module.exports = expressCheckoutTests;
