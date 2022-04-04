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
    switchToFrame,
    waitForDocStateComplete,
    scrollToBottom,
} = require("../services/pageUtils");

const paypalTests = () => {
    beforeEach(async () => {
        await loadNewPage();
        await waitForDocStateComplete();
    });

    it("Makes Payment with PayPal", async () => {
        await waitForVisibleElement(".PAYPAL-button-container-1");
        await switchToFrame(0);
        await waitForVisibleElement(".paypal-button-text");
        await clickEnabledElement(".paypal-button-number-0");

        await waitForWindowCount(2);
        await switchToCurrentWindow();
        await maximizeWindow();

        await sendKeysToVisibleElement("#email", "paypal_test_account@optile.net");
        await clickEnabledElement("#btnNext");

        await sendKeysToVisibleElement("#password", "123456789");

        await clickEnabledElement("#btnLogin");
        await DRIVER.sleep(8000);
        await waitForVisibleElement('[track-submit="choose_FI_interstitial"]');
        await clickEnabledElement('[track-submit="choose_FI_interstitial"]');

        await waitForVisibleElement("#confirmButtonTop");
        await clickEnabledElement("#confirmButtonTop");
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
module.exports = paypalTests;
