const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const path = require('path');

const ENV = 'prod';

module.exports = webpackMerge(commonConfig({env: ENV}), {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[chunkhash].[name].bundle.js',
        chunkFilename: '[chunkhash].[id].chunk.js'
    },
    plugins: [
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new ExtractTextPlugin('[chunkhash].styles.css'),
        new UglifyJsPlugin({
            beautify: false, //prod
            output: {
                comments: false
            }, //prod
            mangle: {
                screw_ie8: true
            }, //prod
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false
            },
        }),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: path.resolve(__dirname, '../'),
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
