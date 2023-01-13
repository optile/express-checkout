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
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime"    
    ]
};
