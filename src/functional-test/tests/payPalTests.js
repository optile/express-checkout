const { Builder, By } = require("selenium-webdriver");
const { getElement} = require("../services/locatingStrategy");
const { clickEnabledElement, sendKeysToVisibleElement, waitForVisibleElement, expectVisibleElement } = require("../services/elementUtils");
const {checkUrlTitle, checkWindowCount} = require("../services/pageUtils");
const BASE_URL = "http://localhost:3000";

// const checkWindowCount = async number => {
//     let windowCount = await DRIVER.getAllWindowHandles();
//     return windowCount.length === number;
// };

// const checkUrlTitle = async title => {
//     let urltitle = await DRIVER.getCurrentUrl();
//     return urltitle.includes(title);
// };

const paypalTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await waitForVisibleElement("[test-id=payments-container-1]");
    });

    beforeEach(async () => {
        // await DRIVER.get(BASE_URL);
        // await waitForVisibleElement("[test-id=payments-container-1]");
    });

    // it("Cancels the PayPal popup", async () => {
    //     await waitForElement(".paypal-button-container.paypal-button-container-1");
    //     (await getElement(".paypal-button-container.paypal-button-container-1")).click();
    //     await DRIVER.wait(() => checkWindowCount(2));
    //     await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
    //     await waitForElement("#email");
    //     await DRIVER.close();
    //     await DRIVER.wait(() => checkWindowCount(1));
    //     await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
    //     await DRIVER.wait(() => checkUrlTitle("mode=Cancel"));
    // });

    it("Makes Payment with PayPal", async () => {
        await waitForVisibleElement(".paypal-button-container.paypal-button-container-1");
        
        await clickEnabledElement('.paypal-button');
   
        await DRIVER.wait(() => checkWindowCount(2));

        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
   
        await sendKeysToVisibleElement("#email", "paypal_test_account@optile.net");
        await clickEnabledElement("#btnNext");

        await waitForVisibleElement("#password");
        await sendKeysToVisibleElement("#password", "123456789");

        await clickEnabledElement("#btnLogin");

        await expectVisibleElement("[data-testid=change-shipping]");

        if (await getElement("#acceptAllButton").isDisplayed()) {
            await clickEnabledElement("#acceptAllButton");
        }
        await DRIVER.manage().window().maximize();        
        await clickEnabledElement("#payment-submit-btn");

        await DRIVER.wait(() => checkWindowCount(1));

        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        await DRIVER.wait(() => checkUrlTitle("interactionCode=PROCEED"));

        await clickEnabledElement("[test-id=payments-summary-confirm-button]");

        await DRIVER.wait(() => checkUrlTitle("mode=Successful"));
    });
};
module.exports = paypalTests;
