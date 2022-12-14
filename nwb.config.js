const webpack = require("webpack"); //to access built-in plugins
const Dotenv = require("dotenv-webpack");

module.exports = {
    type: "react-component",
    webpack: {
        extra: {
            plugins: [
                new Dotenv({
                    path: ".env",
                }),
                new webpack.BannerPlugin({
                    banner: `/*!
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */
 `,
                    raw: true,
                }),
            ],
        },
    },
    npm: {
        esModules: true,
        umd: {
            global: "optileExpressCheckout",
            externals: {
                react: "React",
            },
        },
    },
};
