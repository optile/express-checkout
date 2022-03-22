/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const { paypalCheckoutTests } = require("../tests/payPalTests");
const { paypalPayLaterTests } = require("../tests/payPalPayLaterTests");

const expressCheckoutTests = require("../tests/expressCheckoutTests");
const { negativePaypalCheckoutTests, negativePaypalPayLaterTests } = require("../tests/negativePayPalTests");
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
    describe("PayPal Pay Later Tests", paypalPayLaterTests);
    describe("PayPal Checkout Tests", paypalCheckoutTests);
    describe("PayPal Checkout Negative Tests", negativePaypalCheckoutTests);
    describe("PayPal Pay Later Negative Tests", negativePaypalPayLaterTests);
});
