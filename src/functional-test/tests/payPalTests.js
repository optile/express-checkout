const { Builder, By } = require("selenium-webdriver");
const { getElement, getElementByXpath } = require("../services/locatingStrategy");
import "babel-polyfill";
const BASE_URL = "http://localhost:3000";
const LONG_WAIT = 50000;

const payPalTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
        await DRIVER.sleep(3000);
    });

    beforeEach(async () => {
        await DRIVER.sleep(2000);
    });

    it("Is PayPal Button Displayed", async () => {
        await getElement(".paypal-button").isDisplayed();
    });

    it("Checks if PayPal Pop-up is Displayed", async () => {
        console.log("in tests2");
        await DRIVER.sleep(2000);
        await DRIVER.switchTo().frame(0);
        (await getElement(".paypal-button")).click();
        await DRIVER.sleep(5000);
        DRIVER.getAllWindowHandles().then(allhandles => DRIVER.switchTo().window(allhandles.pop()));
        //    await getElement("#email").isDisplayed();
        await getElement("#email").sendKeys("paypal_test_account@optile.net");
        (await getElement("#btnNext")).click();
        await DRIVER.sleep(2000);
        await getElement("#password").sendKeys("123456789");
        (await getElement("#btnLogin")).click();
        await DRIVER.sleep(9000);
        await DRIVER.manage().deleteAllCookies();   
        await DRIVER.sleep(2000);   
        (await getElement("#confirmButtonTop")).click();
        await DRIVER.sleep(4000);
        (await getElementByXpath("//button[text()='Confirm']")).click();
        await DRIVER.sleep(4000);
        
    });
};
module.exports = payPalTests;
