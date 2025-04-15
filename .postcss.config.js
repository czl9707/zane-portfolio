import PostcssPresetEnv from 'postcss-preset-env'

module.exports = {
    plugins: [
        PostcssPresetEnv({
            stage: 1,
            features: {
                'custom-media-queries': true,
                'nesting-rules': true,
            },
        }),
    ],
};
