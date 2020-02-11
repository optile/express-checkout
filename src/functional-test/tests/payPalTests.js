const { Builder, By } = require("selenium-webdriver");
const { getElement, waitForElement } = require("../services/locatingStrategy");
import "babel-polyfill";
import { until } from "selenium-webdriver";
import { composeInitialProps } from "react-i18next";
const BASE_URL = "https://optile.github.io/express-checkout/?env=integration";

const containsNrWindows = async (number) => {
    let windowCount = await DRIVER.getAllWindowHandles()
    return windowCount.length === number;
}

const paypalTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await waitForElement('[test-id=payments-container]');
    });

    beforeEach(async () => {
        await DRIVER.sleep(2000);
    });

    it("Cancels the PayPal popup", async () => {
        await waitForElement(".paypal-button-container");
        await DRIVER.switchTo().frame(0);
        (await getElement(".paypal-button")).click();
        await DRIVER.wait(containsNrWindows(2));
        let windowd = await DRIVER.getAllWindowHandles();
        console.log("expect 2 ==" +windowd);
        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        await waitForElement("#email");
        await DRIVER.close();
        await DRIVER.wait(containsNrWindows(1));
        let parentwinwd = await DRIVER.getAllWindowHandles();
        console.log("expect 1 ==" +parentwinwd);
        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        const checkCancelUrlTitle = async () => {
            let title = await DRIVER.getCurrentUrl();
            return title.includes("optile.io");
        };
        await DRIVER.wait(checkCancelUrlTitle);
    });

    it("Makes Payment with PayPal", async () => {
        await DRIVER.get(BASE_URL);
        await DRIVER.sleep(2000);
        await waitForElement(".payments-container");
        await waitForElement(".paypal-button");
        await DRIVER.switchTo().frame(0);        
        (await getElement(".paypal-button")).click();


        // const checkPayPalWindowsCount = async () => {
        //     let windowCount = await DRIVER.getAllWindowHandles();
        //     return windowCount.length === 2;
        // };
        
        await DRIVER.wait(containsNrWindows(2));
        let makedwindow = await DRIVER.getAllWindowHandles();
        console.log( "expect 2 ==" +makedwindow);

        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        await waitForElement("#email");
        (await getElement("#email")).sendKeys("paypal_test_account@optile.net");
        await waitForElement("#btnNext");
        (await getElement("#btnNext")).click();
        await DRIVER.sleep(2000);
        await waitForElement("#password");
        (await getElement("#password")).sendKeys("123456789");
        await waitForElement("#btnLogin");
        (await getElement("#btnLogin")).click();
        const isPayPageDisplayed = async () => {
            let transactionCart = await getElement("#transactionCart");
            return transactionCart.isDisplayed();
        };
        await DRIVER.wait(isPayPageDisplayed);
        if (await getElement("#acceptAllButton").isDisplayed() ) {
           (await getElement("#acceptAllButton")).click();
        }
        await DRIVER.manage().window().maximize();
        (await getElement("#confirmButtonTop")).click();


        // const checkParentWindow = async () => {
        //     let windowCount = await DRIVER.getAllWindowHandles();
        //     return windowCount.length === 1;
        // };


        await DRIVER.wait(containsNrWindows(1), 20000);
        let makewindwo2 = await DRIVER.getAllWindowHandles();
        console.log("expect 1 ==" + makewindwo2);

        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        const checkConfirmUrlTitle = async () => {
            let ConfirmUrlTitle = await DRIVER.getCurrentUrl();
            return ConfirmUrlTitle.includes("interactionCode=PROCEED");
        };
        await DRIVER.wait(checkConfirmUrlTitle, TIME);

        await waitForElement('[test-id=payments-summary-confirm-button]');
        (await getElement('[test-id=payments-summary-confirm-button]')).click();
        const checkSuccessUrlTitle = async () => {
            let SuccessUrltitle = await DRIVER.getCurrentUrl();
            return SuccessUrltitle.includes("optile.net");
        };
        await DRIVER.wait(checkSuccessUrlTitle);

    });
};
module.exports = paypalTests;
