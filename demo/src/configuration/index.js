import { sendDataWithParams, sendData } from "../../../src/utils/network";
import { getValuesFromParameters } from "./utils";

export const getRedirectUrl = (url, parameters) => {
    const queryString = parameters.reduce(
        (acc, current) => `${acc}${encodeURIComponent(current.name)}=${encodeURIComponent(current.value)}&`,
        ""
    );
    return `${url}${url.includes("?") ? "&" : "?"}${queryString.slice(0, -1)}`;
};

/**
 * consists of result codes of the magic numbers of paypal
 * these are required to handle these cases separately
 * we add these result code, interaction reason and interaction
 * code in the query params, so that QA could test the magic numbers
 */ 
const magicResultCodes = ["45000.PAYPAL.13122", "45014.PAYPAL.10009", "12015.PAYPAL.10101", "10520.PAYPAL.10014", "30004.PAYPAL.10411", "12015.PAYPAL.10103", "30000.PAYPAL.10004"];
const attributes = {
    local: {
        configuration: {
            baseURL: "https://api.integration.oscato.com/pci/v1/express",
            clientId: "v1.opt-div-app.82785031e74645ada48b966a5ecdd0db",
            country: "DE",
            language: "de_DE",
            translation: [
                {
                    language: "en",
                    resource: {
                        confirm: "Confirm",
                    },
                },
                {
                    language: "de",
                    resource: {
                        confirm: "Bestätigen",
                    },
                },
            ],
            paymentMethodsConfiguration: [
                {
                    code: "PAYPAL",
                    style: {
                        size: "small",
                        color: "gold",
                        shape: "rect",
                        label: "checkout",
                    },
                },
            ],
        },
        // createTransactionDetails, is set in product1.js and product2.js
        customFunctions: {
            createExpressPreset: ({ url, transaction, network, clientId }) => {
                const promise = sendDataWithParams({ baseURL: url, method: "POST", params: { clientId }, body: transaction });
                promise.then(result => {
                    const { data, response } = result;
                    const { interactionReason, resultCode, interactionCode } = getValuesFromParameters(data?.redirect?.parameters || []);
                    
                    if (response?.ok && magicResultCodes.includes(resultCode)) {
                        const queryParams = `?interactionReason=${interactionReason}&resultCode=${resultCode}&interactionCode=${interactionCode}`;
                        window.history.pushState({ path: queryParams }, '', queryParams);
                    }
                });
                return promise;
            },
            confirmExpressPreset: ({ url, network, longId }) => {
                const promise = sendData({ url, method: "POST", body: {} });
                promise.then(result => {
                    const { data, response } = result;
                    const { interactionReason, resultCode, interactionCode } = getValuesFromParameters(data?.redirect?.parameters || []);

                    if (response?.ok && magicResultCodes.includes(resultCode)) {
                        const queryParams = `?interactionReason=${interactionReason}&resultCode=${resultCode}&interactionCode=${interactionCode}`;
                        window.history.pushState({ path: queryParams }, '', queryParams);
                    }
                });
                return promise;
            },
        },
    },
    integration: {
        configuration: {
            baseURL: "https://api.integration.oscato.com/pci/v1/express",
            clientId: "v1.opt-div-app.22458cbbc50f4cc6a09932ea8491a2eb",
            country: "DE",
            language: "en_US",
            translation: [
                {
                    language: "en",
                    resource: {
                        confirm: "confirm",
                    },
                },
                {
                    language: "de",
                    resource: {
                        confirm: "bestätigen",
                    },
                },
            ],
            paymentMethodsConfiguration: [
                {
                    code: "PAYPAL",
                    style: {
                        size: "small",
                        color: "gold",
                        shape: "rect",
                        label: "checkout",
                    },
                },
            ],
        },
        // createTransactionDetails, is set in product1.js and product2.js
        customFunctions: {},
    },
};

function getEnv(queryStringEnv) {
    if (queryStringEnv) {
        return queryStringEnv;
    }
    if (window.location.hostname === "localhost") {
        return "local";
    }
    return "integration";
}

export default function getAttributes() {
    var urlParams = new URLSearchParams(window.location.search);
    var env = getEnv(urlParams.get("env"));

    return attributes[env] || null;
}
