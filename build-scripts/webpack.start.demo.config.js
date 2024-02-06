const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
    mode: "development",
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
                                targets: "last 1 chrome version, last 1 firefox version, last 1 safari version",
                                useBuiltIns: "entry",
                                corejs: 3,
                                exclude: ["transform-typeof-symbol"],
                                modules: false,
                            },
                        ],
                        [
                            "@babel/preset-react",
                            { development: true },
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
                        "react-refresh/babel.js",
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
                        loader: "style-loader",
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
    performance: { hints: false },
    optimization: { noEmitOnErrors: true, runtimeChunk: "single" },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "\"development\"",
        }),
        new webpack.LoaderOptionsPlugin({
            context: "./",
        }),
        new webpack.HotModuleReplacementPlugin({
            fullBuildTimeout: 200,
            requestTimeout: 10000,
        }),
        new ReactRefreshPlugin({
            exclude: /node_modules/,
            include: /\.([jt]sx?|flow)$/,
            overlay: {
                entry: path.join(path.resolve(__dirname), "../node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ErrorOverlayEntry.js"),
                module: path.join(path.resolve(__dirname), "../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js"),
                sockIntegration: "wds",
            },
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
        new Dotenv({ path: ".env", prefix: "process.env." }),
        new webpack.BannerPlugin({
            banner: "/*!\n" +
                " * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.\n" +
                " */\n" +
                " ",
            raw: true,
        }),
    ],
    resolveLoader: {
        modules: [
            "node_modules",
        ],
    },
    devtool: "cheap-module-source-map",
    entry: [
        "./node_modules/webpack-dev-server/client/index.js?/",
        "./node_modules/webpack/hot/only-dev-server.js",
        "./demo/src/index.js",
    ],
    devServer: {
        port: 3000,
        headers: { "Access-Control-Allow-Origin": "*" },
        static: {
            publicPath: "/"
        },
        watchFiles: {
            paths: ['src/**/*', 'dist/**/*'],
        },
        historyApiFallback: true,
        hot: true,
        client: {
            overlay: true,
        }
    },
};