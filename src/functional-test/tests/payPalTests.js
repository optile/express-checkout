const { Builder, By } = require("selenium-webdriver");
const { clickEnabledElement, clickElement, sendKeysToVisibleElement, waitForVisibleElement, expectVisibleElement } = require("../services/elementUtils");
const { checkUrlTitle, waitForWindowCount, loadNewPage, maximizeWindow, waitForUrlTitle, switchToNextWindow } = require("../services/pageUtils");
const { itoff } = require("../services/testUtils");

const paypalTests = () => {
    beforeEach(async () => {
        await loadNewPage();
    });

    itoff("Cancels the PayPal popup", async () => {
        await waitForVisibleElement(".paypal-button-container.paypal-button-container-1");
        await clickEnabledElement(".paypal-button");

        await waitForWindowCount(2);
        await switchToNextWindow();

        await waitForVisibleElement("#email");
        /// I am not sure what should happen here? Click the go back link in the paypal page?
        
        await waitForWindowCount(1);
        await switchToNextWindow();
        await waitForUrlTitle("mode=Cancel");
    });

    it("Makes Payment with PayPal", async () => {
        await waitForVisibleElement(".paypal-button-container.paypal-button-container-1");
        await clickEnabledElement('.paypal-button');

        await waitForWindowCount(2);

        // REMIND, this function runs through all handles instead of just one.
        // Not sure what the meaning is of running through all handles.
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
