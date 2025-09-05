module.exports = {
    plugins: {
        '@csstools/postcss-global-data': {
            files: [
                "src/css/global.css"
            ]
        },
        'postcss-custom-properties': { preserve: false },
        'postcss-custom-media': { preserve: false },
    },
};