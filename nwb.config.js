const webpack = require("webpack"); //to access built-in plugins
module.exports = {
    type: "react-component",
    webpack: {
        extra: {
            plugins: [
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
