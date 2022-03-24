/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const { Builder, By } = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
const { clickEnabledElement, sendKeysToVisibleElement, waitForVisibleElement, expectVisibleElement } = require("../services/elementUtils");
const {
    waitForWindowCount,
    loadNewPage,
    maximizeWindow,
    waitForUrlContainsValue,
    switchToCurrentWindow,
    switchToDefaultContent,
    waitForDocStateComplete,
    scrollToBottom,
    switchToParentWindow,
} = require("../services/pageUtils");

const { clickOnPayPalButton } = require("../services/paypal");

const paypalCheckoutTests = () => {
    beforeEach(async () => {
        await loadNewPage();
        await waitForDocStateComplete();
    });

    afterEach(async () => {
        await switchToParentWindow();
        await switchToDefaultContent();
    });

    it("Makes Payment with PayPal", async () => {
        await clickOnPayPalButton(0);

        await waitForWindowCount(2);
        await switchToCurrentWindow();
        await maximizeWindow();

        /**
         * User is already logged in from previous test so no need to login again.
         */
        // await sendKeysToVisibleElement("#email", "paypal_test_account@optile.net");
        // await clickEnabledElement("#btnNext");

        await switchToDefaultContent();
        await waitForVisibleElement("#root");
        await scrollToBottom();

        // TODO: replace this implicit wait with a suitable function that keeps track of PayPal loader
        await DRIVER.sleep(5000);
        await waitForVisibleElement("#payment-submit-btn");
        await clickEnabledElement("#payment-submit-btn");
        await waitForWindowCount(1);
        await switchToCurrentWindow();

        // We switch back to default content because previously we
        // opened the frame in the express checkout window
        await switchToDefaultContent();

        await waitForUrlContainsValue("interactionCode=PROCEED");
        await waitForDocStateComplete();

        await clickEnabledElement("[test-id=payments-summary-confirm-button]");
        await waitForUrlContainsValue("mode=Summary");
    });
};
module.exports = { paypalCheckoutTests };
