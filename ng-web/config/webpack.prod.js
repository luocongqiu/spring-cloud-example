const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');

const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig({
    env: 'prod',
    metadata: {
        HMR: false,
        AOT: true,
        WATCH: false,
        envFileSuffix: 'prod'
    }
}), {
    mode: 'production',
    output: {
        path: helpers.root('dist'),
        filename: '[chunkhash].[name].bundle.js',
        chunkFilename: '[chunkhash].[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: helpers.root('config/sass-resources.scss')
                        }
                    }],
                exclude: /(vendor\.scss|global\.scss)/
            },
            {
                test: /(global\.scss)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: helpers.root('config/sass-resources.scss')
                        }
                    }
                ]
            },
            {
                test: /(vendor\.scss)/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[chunkhash].[name].css',
            chunkFilename: '[chunkhash].[id].css'
        }),
        new HashedModuleIdsPlugin(),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: helpers.root(''),
                htmlLoader: {
                    minimize: true,
                    removeAttributeQuotes: false,
                    caseSensitive: true,
                    customAttrSurround: [
                        [/#/, /(?:)/],
                        [/\*/, /(?:)/],
                        [/\[?\(?/, /(?:)/]
                    ],
                    customAttrAssign: [/\)?\]?=/]
                }
            }
        })
    ]
});
