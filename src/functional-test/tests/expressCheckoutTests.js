const { Builder, By } = require("selenium-webdriver");
const { expectVisibleElement } = require("../services/elementUtils");
const { loadNewPage, waitForDocStateComplete } = require("../services/pageUtils");

const expressCheckoutTests = () => {
    beforeAll(async () => {
        await loadNewPage();
        await waitForDocStateComplete();
    });

    it("Check if Payments Container is Displayed", async () => {
        await expectVisibleElement("[test-id=payments-container-1]");
    });

    it("Check if PayPal Container is Displayed", async () => {
        await expectVisibleElement("[test-id=paypal-button-container-1]");
    });

    it("Check if PayPal Button is Displayed", async () => {
        await expectVisibleElement(".paypal-button-container.paypal-button-container-1");
    });
};
module.exports = expressCheckoutTests;
