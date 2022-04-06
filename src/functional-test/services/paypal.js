const { waitForVisibleElement, clickEnabledElement } = require("./elementUtils");
const { switchToFrame } = require("./pageUtils");

export const clickOnPayPalButton = async (index) => {
    await waitForVisibleElement(".paypal-group-button-container-1");
    await switchToFrame(index);
    await waitForVisibleElement(".paypal-button-text");
    await clickEnabledElement(".paypal-button-number-0");
};
