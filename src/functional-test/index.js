/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const capabilities = require('./data/capabilities');
const server = require("./server");
const shell = require("shelljs");
const command = "jest -c src/functional-test/config/jest.config.js --outputFile=e2e-result.json --json";
const stage = process.env.GO_STAGE_NAME === "release" ? "release" : "build";

(async () => {
    
    try {
        const allBrowserStackCapabilities = await server.capabilities();
        const executeTests = capability => {
            process.env.CAPABILITY = JSON.stringify({ ...capability, browserName: capability.browser, browser: undefined });
            if (shell.exec(command).code !== 0) {
                process.exit(1);
            }
        };

        capabilities[stage].forEach(async capability => {
            if (capability.fixed) {
                return executeTests(capability);
            }
            allBrowserStackCapabilities
                .filter(
                    browserstackCapabilities =>
                        browserstackCapabilities.os.toLowerCase() === capability.os.toLowerCase() &&
                        browserstackCapabilities.os_version.toLowerCase() === capability.os_version.toLowerCase() &&
                        browserstackCapabilities.browser.toLowerCase() === capability.browser.toLowerCase() &&
                        browserstackCapabilities.browser_version.indexOf("beta") === -1
                )
                .filter((browserstackCapabilities, index, arr) => index > arr.length - 4)
                .forEach(executeTests);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
