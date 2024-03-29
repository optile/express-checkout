module.exports = {
    presets: [
        [
            "@babel/preset-env",
            { loose: true, modules: "commonjs" },
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
            "babel-plugin-transform-react-remove-prop-types",
            { mode: "wrap" },
        ],
        [
            "@babel/plugin-transform-runtime",
            { absoluteRuntime: false, useESModules: false, helpers: true },
        ],
        "babel-plugin-add-module-exports",
    ],
    ignore: ["../**/*.spec.js", "../**/*.test.js", "../**/__tests__/", "../**/testSetup.js"],
};