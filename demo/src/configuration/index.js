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
            // onProceed: ({ preset, step, dispatch }) => {
            //     console.log("here it is rewritten onProceed function to disable the redirect after operation");
            //     if (!preset.redirect) {
            //         console.log("Redirect information is not found in Preset response");
            //         return;
            //     }
            //     const { url, method, parameters } = preset.redirect;
            //     if (method === "GET") {
            //         console.log("we should be redirected to: " + getRedirectUrl(url, parameters));
            //         // window.location.assign(getRedirectUrl(url, parameters));
            //     } else {
            //         console.log(`Redirect via ${method} is not supported`);
            //     }
            // },
        },
    },
};

export default function getAttributes() {
    var urlParams = new URLSearchParams(location.search);
    var env = urlParams.get("env") || "local";

    return attributes[env] || null;
}
