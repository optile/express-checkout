/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const { Builder, By } = require("selenium-webdriver");
const { clickEnabledElement, sendKeysToVisibleElement, waitForVisibleElement, expectVisibleElement } = require("../services/elementUtils");
const {
    waitForWindowCount,
    loadNewPage,
    maximizeWindow,
    waitForUrlContainsValue,
    switchToCurrentWindow,
    switchToDefaultContent,
    waitForDocStateComplete,
} = require("../services/pageUtils");

const { clickOnPayPalButton } = require("../services/paypal");

const paypalCheckoutTests = () => {
    beforeEach(async () => {
        await loadNewPage();
        await waitForDocStateComplete();
    });

    it("Makes Payment with PayPal", async () => {
        await clickOnPayPalButton(0);

        await waitForWindowCount(2);
        await switchToCurrentWindow();
        await maximizeWindow();

        await sendKeysToVisibleElement("#email", "paypal_test_account@optile.net");
        await clickEnabledElement("#btnNext");

        await sendKeysToVisibleElement("#password", "123456789");

        await clickEnabledElement("#btnLogin");
        await expectVisibleElement("[data-testid=change-shipping]");

        /**
         * Because of Accept Cookies popup the Submit button is hidden
         * To avoid clicking on Accept Cookies button we are maximizing the Paypal popup
         * so that Submit button is visible
         *  */

        // await waitForVisibleElement("#acceptAllButton");
        // await clickEnabledElement("#acceptAllButton");

        await clickEnabledElement("#payment-submit-btn");
        await waitForWindowCount(1);
        await switchToCurrentWindow();

        // We switch back to default content because previously we
        // opened the frame in the express checkout window
        await switchToDefaultContent();

        await waitForUrlContainsValue("interactionCode=PROCEED");
        await waitForDocStateComplete();
        await clickEnabledElement("[test-id=payments-summary-confirm-button]");
        await waitForUrlContainsValue("mode=Successful");
    });
};
module.exports = { paypalCheckoutTests };
