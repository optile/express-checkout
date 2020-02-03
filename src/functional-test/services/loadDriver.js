const webdriver = require("selenium-webdriver");

module.exports = () => {
    return new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
};
