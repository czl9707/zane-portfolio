module.exports = {
    plugins: {
        '@csstools/postcss-global-data': {
            files: [
                "src/styles/global.css"
            ]
        },
        'postcss-custom-properties': { preserve: false },
        'postcss-custom-media': { preserve: false },
    },
};