  
const payPalTests = require("../tests/payPalTests");
const LoadDriver = require("../services/loadDriver");


describe("Test Suite", () => {
  beforeAll(async () => {
    global.DRIVER = LoadDriver();
    global.TIME = 5000;
  });

  afterAll(async () => {
    await DRIVER.quit();
  });

  describe("PayPal Express Checkout Tests", payPalTests);
  
});