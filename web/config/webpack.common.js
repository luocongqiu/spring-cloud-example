const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const path = require('path');

const config = require('./config');

module.exports = function (options) {
    return {
        entry: {
            'polyfills': './src/app/polyfills',
            'global': './src/assets/scss/global.scss',
            'main': './src/app/app.main'
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules'],
            plugins: [
                new TsConfigPathsPlugin()
            ]
        },
        module: {
            rules: [
                {
                    test: /\.pdf/,
                    loaders: ['url-loader?limit=10000']
                },
                {
                    test: /\.ts$/,
                    loaders: ['ng-router-loader', 'angular2-template-loader', 'awesome-typescript-loader']
                },
                {
                    test: /\.html$/,
                    loader: ['html-loader'],
                    exclude: [/src\/index\.html/]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'to-string-loader',
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                        'sass-loader?sourceMap',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    './src/assets/scss/variables.scss',
                                    './config/sass-resources.scss'
                                ]
                            }
                        }],
                    exclude: /global\.scss/
                },
                {
                    test: /global\.scss/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            "css-loader?sourceMap",
                            'postcss-loader?sourceMap',
                            'sass-loader?sourceMap',
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: [
                                        './src/assets/scss/variables.scss',
                                        './config/sass-resources.scss'
                                    ]
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    loaders: [
                        'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
                        {
                            loader: 'image-webpack-loader',
                            query: {
                                progressive: true,
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                optipng: {
                                    optimizationLevel: 7
                                },
                                gifsicle: {
                                    interlaced: false
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(svg|woff|woff2|ttf|eot)$/i,
                    loaders: [
                        'file-loader?hash=sha512&digest=hex&name=assets/fonts/[hash].[ext]'
                    ]
                },
                {
                    test: /app.constants.ts$/,
                    loader: StringReplacePlugin.replace({
                        replacements: [
                            {
                                pattern: /\/\* @replace (\w*?) \*\//ig,
                                replacement: function (match, p1) {
                                    return `_${p1} = ${config[p1]};`;
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new DefinePlugin({
                ENV: require('../config.json')[options.env]
            }),
            new CommonsChunkPlugin({
                names: ['manifest', 'polyfills'].reverse()
            }),
            new webpack.DllReferencePlugin({
                context: './',
                manifest: require(path.resolve(`${config.dllPath}/vendor.json`)),
            }),
            new CopyWebpackPlugin([
                {from: './src/favicon.ico', to: 'favicon.ico'},
                {from: './src/robots.txt', to: 'robots.txt'}
            ]),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                Tooltip: 'tether-tooltip',
                toastr: 'toastr'
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency',
                inject: true
            }),
            new AddAssetHtmlPlugin([
                {
                    filepath: path.resolve(`${config.dllPath}/vendor.dll.js`),
                    hash: true,
                    includeSourcemap: false
                },
                {
                    filepath: path.resolve(`${config.dllPath}/vendor.css`),
                    typeOfAsset: 'css',
                    hash: true,
                    includeSourcemap: false
                }
            ]),
            new StringReplacePlugin()
        ]
    };
};
