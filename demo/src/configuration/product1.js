export default (requestData, price) => {
    const amount = price || 2;
    return {
        transactionId: "tr-" + new Date().getTime(),
        country: "DE",
        providerRequest: requestData,
        payment: {
            amount,
            currency: "EUR",
            reference: "Payment #1",
            longReference: {
                essential: "Thank you for your purchase!",
            },
        },
        products: [
            {
                name: "USB C cable",
                amount,
            },
        ],
    };
};
