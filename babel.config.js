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
        "@babel/preset-es2015",
    ],
    "plugins": [
        "babel/polyfill",
        "syntax-dynamic-import",
        "transform-object-rest-spread",
        [
          "transform-class-properties",
          {
            "spec": true
          }
        ]
};
