const capabilities = require('./data/capabilities');
const server = require('./server');
const shell = require('shelljs');
const command = 'jest -c src/functional-test/config/jest.config.js --outputFile=e2e-result.json --json';
const stage = process.env.GO_STAGE_NAME === 'release' ? 'release' : 'build';

(async () => {
    const allCap = await server.capabilities();

    const executeTests = capability => {
        process.env.CAPABILITY = JSON.stringify({ ...capability, browserName: capability.browser, browser: undefined });
        if (shell.exec(command).code !== 0) {
            process.exit(1);
        }
    };

    capabilities[stage].forEach(async item => {
        if (item.fixed) {
            return executeTests(item);
        }

        allCap
            .filter(
                i =>
                    i.os.toLowerCase() === item.os.toLowerCase() &&
                    i.os_version.toLowerCase() === item.os_version.toLowerCase() &&
                    i.browser.toLowerCase() === item.browser.toLowerCase() &&
                    i.browser_version.indexOf('beta') === -1
            )
            .filter((i, index, arr) => index > arr.length - 4)
            .forEach(executeTests);
    });
})();
