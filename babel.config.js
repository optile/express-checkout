module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    "chrome": 52,
                    "browsers": ["last 2 versions", "safari 7", "ie 11"]
                },
            },
        ],
        "@babel/preset-react",
    ],
    "plugins": [
        "syntax-dynamic-import",
        "@babel/plugin-proposal-object-rest-spread"
    ]
};
