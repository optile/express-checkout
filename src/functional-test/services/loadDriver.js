/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const webdriver = require("selenium-webdriver");
const PROJECT_TITLE = require('../../../package').title;

module.exports = () => {
    if (process.env.LOCALENV) {
        return new webdriver.Builder().forBrowser(process.env.LOCALENV).build();
    }

    const { BROWSERSTACK_USER, BROWSERSTACK_KEY, CAPABILITY } = process.env;

    var capabilities = {
        ...JSON.parse(CAPABILITY),
        project: PROJECT_TITLE,
        "browserstack.networkLogs": true,
        "browserstack.debug": true,
        "browserstack.local": true,
        "browserstack.user": BROWSERSTACK_USER,
        "browserstack.key": BROWSERSTACK_KEY,
    };

    return new webdriver.Builder()
        .usingServer("http://hub-cloud.browserstack.com/wd/hub")
        .withCapabilities(capabilities)
        .build();
};
