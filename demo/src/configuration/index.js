import { sendDataWithParams, sendData } from "../../../src/utils/network";
import { getValuesFromParameters } from "./utils";
import { magicInteractionCodes } from "./constants";

export const getRedirectUrl = (url, parameters) => {
    const queryString = parameters.reduce(
        (acc, current) => `${acc}${encodeURIComponent(current.name)}=${encodeURIComponent(current.value)}&`,
        ""
    );
    return `${url}${url.includes("?") ? "&" : "?"}${queryString.slice(0, -1)}`;
};

const attributes = {
    local: {
        configuration: {
            baseURL: "https://api.integration.oscato.com/pci/v1/express",
            clientId: "v1.opt-div-app.04f3543b0ac14ba1be55df39aaf08a65",
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
                    const code = data?.interaction?.code;
                    
                    if (response?.ok && magicInteractionCodes.includes(code)) {
                        const { interactionReason, resultCode, interactionCode } = getValuesFromParameters(data?.redirect?.parameters || []);
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
                    const code = data?.interaction?.code;

                    if (response?.ok && magicInteractionCodes.includes(code)) {
                        const { interactionReason, resultCode, interactionCode } = getValuesFromParameters(data?.redirect?.parameters || []);
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