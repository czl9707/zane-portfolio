module.exports = {
    plugins: {
        '@csstools/postcss-global-data': {
            files: [
                "src/app/util.css",
                "src/app/global.css"
            ]
        },
        'postcss-custom-properties': { preserve: false },
        'postcss-custom-media': { preserve: false },
    },
};
