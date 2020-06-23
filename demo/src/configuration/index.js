import { sendDataWithParams, sendData } from "../../../src/utils/network";

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
            getExpressList: ({ country }) => {
                console.log("getExpressList", country);
                const baseURL = "https://api.integration.oscato.com/pci/v1/express";
                const params = { clientId: "v1.opt-div-app.82785031e74645ada48b966a5ecdd0db", country };
                return sendDataWithParams({ baseURL, method: "GET", params });
            },
            createExpressPreset: ({ url, transaction, network, clientId }) => {
                const baseURL = url;
                const params = { clientId: "v1.opt-div-app.82785031e74645ada48b966a5ecdd0db" };
                return sendDataWithParams({ baseURL, method: "POST", params, body: transaction });
            },
            getExpressPresetAccount: ({ url }) => {
                console.log("configuration", url);
                return sendDataWithParams({
                    baseURL: `https://api.integration.oscato.com/pci/v1/presets${url}`,
                    method: "GET",
                    params: {},
                });
            },
            updateExpressPreset: ({ url, longId, transaction }) => {
                console.log("inside update", longId);
                sendData({ url, method: "PUT", body: transaction });
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

export default function getAttributes() {
    var urlParams = new URLSearchParams(location.search);
    var env = urlParams.get("env") || "local";

    return attributes[env] || null;
}
