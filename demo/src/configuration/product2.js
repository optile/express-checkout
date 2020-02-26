export default requestData => {
    return {
        transactionId: "tr-" + new Date().getTime(),
        country: "DE",
        providerRequest: requestData,
        payment: {
            amount: 10,
            currency: "EUR",
            reference: "Payment #1",
            longReference: {
                essential: "Thank you for your purchase!",
            },
        },
        products: [
            {
                name: "USB C cable fast",
                amount: 10,
            },
        ],
    };
};
