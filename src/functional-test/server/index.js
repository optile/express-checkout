/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const fetch = require("node-fetch");
const Dotenv = require('dotenv');
Dotenv.config();

async function capabilities() {
    const { BROWSERSTACK_USER, BROWSERSTACK_KEY } = process.env;
    var auth = "Basic " + new Buffer.from(BROWSERSTACK_USER + ":" + BROWSERSTACK_KEY).toString("base64");

    return fetch("https://api.browserstack.com/automate/browsers.json", {
        method: "get",
        headers: {
            Authorization: auth,
        },
    }).then(response => response.json());
}

module.exports = { capabilities };
