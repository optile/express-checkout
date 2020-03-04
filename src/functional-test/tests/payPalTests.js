const { Builder, By } = require("selenium-webdriver");
const { getElement, waitForElement } = require("../services/locatingStrategy");
import "babel-polyfill";
import { until } from "selenium-webdriver";
import { composeInitialProps } from "react-i18next";
const BASE_URL = "http://localhost:3000";

const checkWindowCount = async number => {
    let windowCount = await DRIVER.getAllWindowHandles();
    return windowCount.length === number;
};

const checkUrlTitle = async title => {
    let urltitle = await DRIVER.getCurrentUrl();
    return urltitle.includes(title);
};

const paypalTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await waitForElement("[test-id=payments-container-1]");
    });

    beforeEach(async () => {
        await DRIVER.sleep(2000);
    });

    it("Cancels the PayPal popup", async () => {
        await waitForElement(".paypal-button-container.paypal-button-container-1");
        (await getElement(".paypal-button-container.paypal-button-container-1")).click();
        await DRIVER.wait(() => checkWindowCount(2));
        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        await waitForElement("#email");
        await DRIVER.close();
        await DRIVER.wait(() => checkWindowCount(1));
        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        await DRIVER.wait(() => checkUrlTitle("mode=Cancel"));
    });

    it("Makes Payment with PayPal", async () => {
        await DRIVER.get(BASE_URL);
        await DRIVER.sleep(2000);
        await waitForElement("[test-id=payments-container-1]");
        await waitForElement(".paypal-button-container.paypal-button-container-1");
        (await getElement(".paypal-button")).click();
        await DRIVER.wait(checkWindowCount(2));
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
        if (await getElement("#acceptAllButton").isDisplayed()) {
            (await getElement("#acceptAllButton")).click();
        }
        await DRIVER.manage()
            .window()
            .maximize();
        await waitForElement("#confirmButtonTop");    
        (await getElement("#confirmButtonTop")).click();
        await DRIVER.wait(() => checkWindowCount(1));
        await DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        await DRIVER.wait(() => checkUrlTitle("interactionCode=PROCEED"));
        await waitForElement("[test-id=payments-summary-confirm-button]");
        (await getElement("[test-id=payments-summary-confirm-button]")).click();
        await DRIVER.wait(() => checkUrlTitle("mode=Successful"));
    });
};
module.exports = paypalTests;
