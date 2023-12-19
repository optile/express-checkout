const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules[\\/](?!react-app-polyfill)/,
                options: {
                    babelrc: false,
                    cacheDirectory: true,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                loose: true,
                                targets: ">0.2%, not dead, not op_mini all",
                                useBuiltIns: "entry",
                                corejs: 3,
                                exclude: ["transform-typeof-symbol"],
                                modules: false,
                            },
                        ],
                        [
                            "@babel/preset-react",
                            { development: false },
                        ],
                        [
                            "babel-preset-proposals",
                            {
                                loose: true,
                                decorators: true,
                                classProperties: true,
                                exportDefaultFrom: true,
                                exportNamespaceFrom: true,
                                absolutePaths: true,
                            },
                        ],
                    ],
                    plugins: [
                        "@babel/plugin-proposal-optional-chaining",
                        "@babel/plugin-proposal-nullish-coalescing-operator",
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                useESModules: true,
                            },
                        ],
                        "@babel/plugin-syntax-dynamic-import",
                    ],
                },
            },
            {
                test: /\.(gif|png|webp)$/,
                loader: "url-loader",
                options: { limit: 1, name: "[name].[hash:8].[ext]" },
            },
            {
                test: /\.svg$/,
                loader: "url-loader",
                options: { limit: 1, name: "[name].[hash:8].[ext]" },
            },
            {
                test: /\.jpe?g$/,
                loader: "url-loader",
                options: { limit: 1, name: "[name].[hash:8].[ext]" },
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: { limit: 1, name: "[name].[hash:8].[ext]" },
            },
            {
                test: /\.(mp4|ogg|webm)$/,
                loader: "url-loader",
                options: { limit: 1, name: "[name].[hash:8].[ext]" },
            },
            {
                test: /\.(wav|mp3|m4a|aac|oga)$/,
                loader: "url-loader",
                options: { limit: 1, name: "[name].[hash:8].[ext]" },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("autoprefixer")({
                                overrideBrowserslist: ">0.2%, not dead, not op_mini all",
                                browsers: [">0.2%, not dead, not op_mini all"],
                                postcssPlugin: "autoprefixer",
                                postcssVersion: "7.0.39",
                            })],
                        },
                    },
                ],
            },
        ],
        strictExportPresence: true,
    },
    output: {
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].js",
        path: path.join(path.resolve(__dirname), "../demo/dist")
    },
    performance: { hints: false },
    optimization: {
        minimize: true,
        runtimeChunk: "single",
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "\"production\"",
        }),
        new webpack.LoaderOptionsPlugin({
            context: "./",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            ignoreOrder: false,
            chunkFilename: "[name].[contenthash:8].css",
        }),
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true,
        }),
        new HtmlWebpackPlugin({
            template: "demo/src/index.html",
            templateContent: false,
            filename: "index.html",
            hash: false,
            inject: "body",
            scriptLoading: "blocking",
            compile: true,
            favicon: false,
            minify: "auto",
            cache: true,
            showErrors: true,
            chunks: "all",
            excludeChunks: [],
            chunksSortMode: "auto",
            meta: {},
            base: false,
            title: "@payoneer/express-checkout 1.13.0-beta Demo",
            xhtml: false,
            lang: "en",
            mountId: "demo",
        }),
        new Dotenv({
            path: ".env", prefix: "process.env.",
        }),
        new webpack.BannerPlugin({
            banner: "/*!\n" +
                " * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.\n" +
                " */\n" +
                " ",
            raw: true,
        }),
    ],
    resolve: {},
    resolveLoader: {
        modules: [
            "node_modules",
        ],
    },
    devtool: "source-map",
    entry: {
        demo: ["./demo/src/index.js"],
    },
};