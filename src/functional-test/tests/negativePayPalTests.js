const { Builder, By } = require("selenium-webdriver");
const { waitForVisibleElement, clickEnabledElement,clearAndSendKeysToVisibleElement} = require("../services/elementUtils");
const { loadNewPage, switchToFrame, switchToDefaultContent,waitForUrlContainsValues } = require("../services/pageUtils");

const {itoff} = require("../services/testUtils");

const clickOnPayPalButton = async () => {
    await waitForVisibleElement(".paypal-button-container.paypal-button-container-1");
    await switchToFrame(1);
    await waitForVisibleElement(".paypal-button-text");
    await clickEnabledElement(".paypal-button");
    await switchToDefaultContent();
}

const negativePayPalTests = () => {
    beforeEach(async () => {
        await loadNewPage();
        await waitForVisibleElement(".paypal-button-container.paypal-button-container-1");
        await switchToFrame(1);
        await waitForVisibleElement(".paypal-button-text");
        await switchToDefaultContent();
    });

    it('Check magic number 100.04, TRY_OTHER_ACCOUNT, INVALID_ACCOUNT', async () => {
        await clearAndSendKeysToVisibleElement('[test-id=price1]', '100.04');
        await clickOnPayPalButton();
        await waitForUrlContainsValues(['interactionCode=TRY_OTHER_ACCOUNT', 'interactionReason=INVALID_ACCOUNT']);
    });

    itoff('Checks magic number 101.03, TRY_OTHER_ACCOUNT, NETWORK_FAILURE', async () => {
        await clearAndSendKeysToVisibleElement('[test-id=price1]', '101.03');
        await clickOnPayPalButton();
        await waitForUrlContainsValues(['interactionCode=TRY_OTHER_ACCOUNT', 'interactionReason=NETWORK_FAILURE']);
    });

    it('Checks magic number 104.11, TRY_OTHER_ACCOUNT, INVALID_ACCOUNT', async () => {
        await clearAndSendKeysToVisibleElement('[test-id=price1]', '104.11');
        await clickOnPayPalButton();
        await waitForUrlContainsValues(['interactionCode=TRY_OTHER_ACCOUNT', 'interactionReason=INVALID_ACCOUNT']);
    });

    it('Checks magic number 100.14, RETRY, TEMPORARY_FAILURE', async () => {
        await clearAndSendKeysToVisibleElement('[test-id=price1]', '100.14');
        await clickOnPayPalButton();
        await waitForUrlContainsValues(['interactionCode=RETRY', 'interactionReason=TEMPORARY_FAILURE']);
    });

    it('Checks magic number 104.02, TRY_OTHER_ACCOUNT, NETWORK_FAILURE', async () => {
        await clearAndSendKeysToVisibleElement('[test-id=price1]', '104.02');
        await clickOnPayPalButton();
        await waitForUrlContainsValues(['interactionCode=TRY_OTHER_NETWORK', 'interactionReason=NETWORK_FAILURE']);
    });

    it('Checks magic number 100.14, TRY_OTHER_ACCOUNT, NETWORK_FAILURE', async () => {
        await clearAndSendKeysToVisibleElement('[test-id=price1]', '100.14');
        await clickOnPayPalButton();
        await waitForUrlContainsValues(['interactionCode=RETRY', 'interactionReason=TEMPORARY_FAILURE']);
    });  
};
module.exports = negativePayPalTests;