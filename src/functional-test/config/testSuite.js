const paypalTests = require("../tests/payPalTests");
const expressCheckoutTests = require("../tests/expressCheckoutTests");
const LoadDriver = require("../services/loadDriver");

jest.setTimeout(50000);

describe("Test Suite", () => {
    beforeAll(async () => {
        global.DRIVER = LoadDriver();
        global.TIME = 50000;
    });

    afterAll(async () => {
        await DRIVER.quit();
    });

    describe("Express Checkout Tests", expressCheckoutTests);
    describe("PayPal Tests", paypalTests);
});
