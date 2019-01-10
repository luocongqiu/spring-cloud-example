const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig({ env: 'dev' }), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: [helpers.root(`.tmp`)],
        proxy: {
            '/aici': {
                target: 'http://10.1.234.52',
                secure: false
            },
            '/comp': {
                target: 'http://10.1.234.52',
                secure: false
            }
        },
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    output: {
        path: helpers.root('.tmp'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[file].map'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loaders: 'tslint-loader',
                exclude: [/@angular/, /reflect-metadata/, /rxjs/]
            },
            {
                test: /\.scss$/,
                use: [
                    'to-string-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
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
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9000,
            proxy: 'http://localhost:9060'
        }, {
            reload: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new NamedModulesPlugin(),
        new LoaderOptionsPlugin({
            debug: true,
            options: {}
        })
    ]
});
