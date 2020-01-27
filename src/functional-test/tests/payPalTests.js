const { Builder,By } = require('selenium-webdriver');
const {getElement} = require('../services/locatingStrategy');
import 'babel-polyfill';
const BASE_URL = "http://localhost:3000";


const payPalTests = () => {
    beforeAll(async () => {
        await DRIVER.get(BASE_URL);
    });

    it('Checks PayPal Button',() => {
        console.log("PayPal Test Works")     
    });
};
module.exports = payPalTests;