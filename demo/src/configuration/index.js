const attributes = {
    local: {
        configuration: {
            baseURL: "https://api.integration.oscato.com/pci/v1/express",
            clientId: "v1.opt-div-app.0ac15ab3faaa4ac7a0ec7e5b72e74961",
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
                {
                    code: "AMAZONPAY",
                    type: "PwA",
                    color: "Gold",
                    size: "small",
                    language: "en-GB",
                    proceedButtonText: "Continue",
                    cancelButtonText: "Cancel Payment",
                    constraints: {
                        PaymentMethodNotAllowed:
                            "There has been a problem with the selected payment method from your Amazon account, please update the payment method or choose another one.",
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
                        name: "product 1 (green)",
                        amount: 2,
                    },
                ],
            };
        },
        customFunctions: {},
    },
};

export default function getAttributes() {
    var urlParams = new URLSearchParams(location.search);
    var env = urlParams.get("env") || "local";

    return attributes[env] || null;
}
