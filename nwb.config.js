module.exports = {
    type: "react-component",
    npm: {
        esModules: true,
        umd: {
            global: "optileExpressCheckout",
            externals: {
                react: "React",
            },
        },
    },
    webpack: {
        define: {
            MERCHANT_ENV: JSON.stringify("555"),
            TOKEN_ENV: JSON.stringify("b348k9ho52e57lmksjl3um438k1e50cde1tbmlekrd"),
        },
    },
};
