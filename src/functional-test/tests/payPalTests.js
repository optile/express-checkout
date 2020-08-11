const { Builder, By } = require("selenium-webdriver");
const { clickEnabledElement, sendKeysToVisibleElement, waitForVisibleElement, expectVisibleElement } = require("../services/elementUtils");
const { waitForWindowCount, loadNewPage, maximizeWindow, waitForUrlTitle, switchToNextWindow } = require("../services/pageUtils");

const paypalTests = () => {
    beforeEach(async () => {
        await loadNewPage();
    });

    it("Makes Payment with PayPal", async () => {
        await waitForVisibleElement(".paypal-button-container.paypal-button-container-1");
        await clickEnabledElement("[test-id=paypal-button-container-1] [id^=zoid-paypal-button]");

        await waitForWindowCount(2);
        await switchToNextWindow();

        await sendKeysToVisibleElement("#email", "paypal_test_account@optile.net");
        await clickEnabledElement("#btnNext");

        await sendKeysToVisibleElement("#password", "123456789");

        await clickEnabledElement("#btnLogin");
        await expectVisibleElement("[data-testid=change-shipping]");

        await waitForVisibleElement("#acceptAllButton");
        await clickEnabledElement("#acceptAllButton");

        await maximizeWindow();
        await clickEnabledElement("#payment-submit-btn");

        await waitForWindowCount(1);
        await switchToNextWindow();

        await waitForUrlTitle("interactionCode=PROCEED");
        await clickEnabledElement("[test-id=payments-summary-confirm-button]");
        await waitForUrlTitle("mode=Successful");
    });
};
module.exports = paypalTests;
