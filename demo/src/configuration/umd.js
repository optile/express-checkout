window.attributes = {
    local: {
        configuration: {
            baseURL: "https://api.integration.oscato.com/pci/v1/express",
            clientId: "v1.opt-div-app.bd0dca87952d454ebb5eaf2398069667",
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
        customFunctions: {},
    },
};

function getAttributes() {
    var urlParams = new URLSearchParams(location.search);
    var env = urlParams.get("env") || "local";

    return attributes[env] || null;
}
