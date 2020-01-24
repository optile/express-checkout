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
            clientId: "v1.opt-div-app.1b293aa844de46d4860da0ad5d29f0fe",
            country: "DE",

            paymentMethodsConfiguration: [
                {
                    code: "PAYPAL",
                    style: {
                        size: "small",
                        color: "gold",
                        shape: "rect",
                        label: "checkout",
                    },
                    locale: "en_US",
                },
            ],
        },
        createTransactionDetails: function(requestData) {
            return {
                transactionId: "tr-" + new Date().getTime(),
                country: "DE",
                providerRequest: requestData,
                payment: {
                    amount: 2,
                    currency: "EUR",
                    reference: "Payment #1",
                    longReference: {
                        essential: "Thank you for your purchase!",
                    },
                },
                products: [
                    {
                        name: "USB C cable",
                        amount: 2,
                    },
                ],
            };
        },
        customFunctions: {
        },
    },
    integration: {
        configuration: {
            baseURL: "https://api.integration.oscato.com/pci/v1/express",
            clientId: "v1.opt-div-app.d1f6628b66064154b5bde44cf095ad61",
            country: "DE",

            paymentMethodsConfiguration: [
                {
                    code: "PAYPAL",
                    style: {
                        size: "small",
                        color: "gold",
                        shape: "rect",
                        label: "checkout",
                    },
                    locale: "en_US",
                },
            ],
        },
        createTransactionDetails: function(requestData) {
            return {
                transactionId: "tr-" + new Date().getTime(),
                country: "DE",
                providerRequest: requestData,
                payment: {
                    amount: 2,
                    currency: "EUR",
                    reference: "Payment #1",
                    longReference: {
                        essential: "Thank you for your purchase!",
                    },
                },
                products: [
                    {
                        name: "USB C cable",
                        amount: 2,
                    },
                ],
            };
        },
        customFunctions: {
        },
    },
};

export default function getAttributes() {
    var urlParams = new URLSearchParams(location.search);
    var env = urlParams.get("env") || "local";

    return attributes[env] || null;
}
