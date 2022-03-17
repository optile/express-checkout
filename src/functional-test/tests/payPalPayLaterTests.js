/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const { Builder, By } = require("selenium-webdriver");
const {
    clickEnabledElement,
    sendKeysToVisibleElement,
    waitForVisibleElement,
    expectVisibleElement,
    clearAndSendKeysToVisibleElement,
} = require("../services/elementUtils");
const {
    waitForWindowCount,
    loadNewPage,
    maximizeWindow,
    minimizeWindow,
    waitForUrlContainsValue,
    switchToCurrentWindow,
    switchToDefaultContent,
    switchToFrame,
    waitForDocStateComplete,
    scrollToBottom,
} = require("../services/pageUtils");

const { clickOnPayPalButton } = require("../services/paypal");

const paypalPayLaterTests = () => {
    beforeEach(async () => {
        await loadNewPage();
        await waitForDocStateComplete();
    });

    it("Makes Payment with PayPal", async () => {
        await clickOnPayPalButton(4);

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

        await clickEnabledElement("label[for='credit-offer-1']");
        await clickEnabledElement(".PayIn1_termsContainer_11rUC label");
        await scrollToBottom();
        await clickEnabledElement("#payment-submit-btn"); // confirm using credits and the terms and conditions

        // an extra small pop up will be opened in the window for more details like phone number
        await switchToFrame(2);

        await clearAndSendKeysToVisibleElement("#phoneNumber", "+4915153550998");

        await clickEnabledElement("#submitButton"); // submit phone number

        await waitForWindowCount(2);
        await switchToCurrentWindow();

        // await clearAndSendKeysToVisibleElement("#iban", "DE89370400440532013000");
        // await clickEnabledElement("#submitButton"); // submit iban

        await clickEnabledElement("#payment-submit-btn"); // click on pay in 30 days button

        // We switch back to default content because previously we
        // opened the frame in the express checkout window
        await switchToDefaultContent();

        await waitForUrlContainsValue("interactionCode=PROCEED");
        await waitForDocStateComplete();
        await clickEnabledElement("[test-id=payments-summary-confirm-button]");
        await waitForUrlContainsValue("mode=Successful");
    });
};
module.exports = { paypalPayLaterTests };
