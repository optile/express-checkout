const webdriver = require("selenium-webdriver");

module.exports = () => {
    if (process.env.RUNENV === "local") {
        return new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    }

    const { BROWSERSTACK_USER, BROWSERSTACK_KEY, CAPABILITY } = process.env;

    var capabilities = {
        ...JSON.parse(CAPABILITY),
        "browserstack.networkLogs": true,
        "browserstack.debug": true,
        "browserstack.local": true,
        "browserstack.user": BROWSERSTACK_USER,
        "browserstack.key": BROWSERSTACK_KEY,
    };

    return new webdriver.Builder().usingServer("http://hub-cloud.browserstack.com/wd/hub").withCapabilities(capabilities).build();
};
