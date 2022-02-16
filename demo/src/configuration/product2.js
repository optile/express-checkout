export default (requestData, price) => {
    const amount = price || 10;
    return {
        transactionId: "tr-" + new Date().getTime(),
        country: "GB",
        providerRequest: requestData,
        payment: {
            amount,
            currency: "GBP",
            reference: "Payment #1",
            longReference: {
                essential: "Thank you for your purchase!",
            },
        },
        products: [
            {
                name: "USB C cable fast",
                amount,
            },
        ],
    };
};
