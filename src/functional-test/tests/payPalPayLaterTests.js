/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const { until } = require("selenium-webdriver");
const {
    clickEnabledElement,
    sendKeysToVisibleElement,
    waitForVisibleElement,
    expectVisibleElement,
    getElement,
    getVisibleElement,
    forceClearInput,
} = require("../services/elementUtils");
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
    switchToParentWindow,
} = require("../services/pageUtils");

const { clickOnPayPalButton } = require("../services/paypal");

const paypalPayLaterTests = () => {
    beforeEach(async () => {
        await loadNewPage();
        await waitForDocStateComplete();
    });

    afterEach(async () => {
        await switchToParentWindow();
        await switchToDefaultContent();
    });

    it("Makes Payment with PayPal Pay Later", async () => {
        await clickOnPayPalButton(4);

        await waitForWindowCount(2);
        await switchToCurrentWindow();
        await maximizeWindow();

        await sendKeysToVisibleElement("#email", "pritam-paypal-test-buyer@personal.example.com");
        await clickEnabledElement("#btnNext");

        await sendKeysToVisibleElement("#password", "1234567890");

        await clickEnabledElement("#btnLogin");
        await expectVisibleElement("[data-testid=change-shipping]");

        await waitForVisibleElement("#gdpr-container");
        await waitForVisibleElement("#acceptAllButton");
        await scrollToBottom();

        await clickEnabledElement("label[for='credit-offer-1']");
        await clickEnabledElement(".PayIn1_termsContainer_11rUC label > span.ppvx_checkbox__check-icon-container___3-6-13-beta-0");
        await scrollToBottom();

        await waitForVisibleElement("#payment-submit-btn");
        await clickEnabledElement("#payment-submit-btn");

        // an extra small pop up will be opened in the window for more details like phone number
        await switchToDefaultContent();
        let frame = getElement('div[data-testid="credit-apply-portable-wrapper"] iframe');
        await switchToFrame(frame);

        let phoneNumField = await getVisibleElement("#phoneNumber");
        await forceClearInput(phoneNumField);
        phoneNumField.sendKeys("49151535509");

        await clickEnabledElement("#submitButton"); // submit phone number

        await waitForWindowCount(2);
        await switchToCurrentWindow();

        /**
         * PayPal is not consistent with this screen. PayPal asks to add bank account details approx. in 1 test out of 50
         * So in case if PayPal brings this screen then the test will fail.
         */
        // await clearAndSendKeysToVisibleElement("#iban", "DE89370400440532013000");
        // await clickEnabledElement("#submitButton"); // submit iban

        // Need to focus first to scroll
        await switchToDefaultContent();
        await getVisibleElement("#cart > button");
        await scrollToBottom();

        // TODO: replace this implicit wait with a suitable function that keeps track of PayPal loader
        await DRIVER.sleep(8000);
        await waitForVisibleElement("#payment-submit-btn");
        await clickEnabledElement("#payment-submit-btn"); // click on pay in 30 days button

        // We switch back to default content because previously we
        // opened the frame in the express checkout window
        await waitForWindowCount(1);
        await switchToParentWindow();

        await waitForUrlContainsValue("interactionCode=PROCEED");

        await waitForDocStateComplete();
        await clickEnabledElement("[test-id='payments-summary-confirm-button']");
        await waitForUrlContainsValue("mode=Summary");
    });
};

module.exports = { paypalPayLaterTests };
