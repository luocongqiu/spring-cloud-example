const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const helpers = require('./helpers');

module.exports = function(options) {
    const isProd = options.env === 'prod';
    const metadata = Object.assign({}, {
        HMR: true,
        AOT: false,
        WATCH: true,
        tsConfigPath: 'tsconfig.json'
    }, options.metadata || {});

    const jsLoaders = {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: metadata.AOT ? [{
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
                sourceMap: false
            }
        }, '@ngtools/webpack'] : ['@ngtools/webpack']
    };
    const entry = {
        polyfills: helpers.root('src/polyfills.ts'),
        global: helpers.root('src/assets/scss/global.scss'),
        main: helpers.root('src/app.main.ts')
    };

    return {
        entry: entry,
        resolve: {
            mainFields: ['browser', 'module', 'main'],
            extensions: ['.ts', '.js', '.json'],
            modules: [helpers.root('node_modules')]
        },
        module: {
            rules: [
                jsLoaders,
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        caseSensitive: true,
                        removeAttributeQuotes: false,
                        minifyJS: false,
                        minifyCSS: false
                    },
                    exclude: [/src\/index\.html/]
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    loaders: [
                        'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]'
                    ]
                },
                {
                    test: /\.(svg|woff|woff2|ttf|eot)$/i,
                    loaders: [
                        'file-loader?hash=sha512&digest=hex&name=assets/fonts/[hash].[ext]'
                    ]
                },
                {
                    test: /404\.html$/,
                    use: [{
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }]
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'all'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: {
                name: entry => `runtime~${entry.name}`
            }
        },
        plugins: [
            new BundleAnalyzerPlugin(),
            new DefinePlugin({
                ENV: require('../config.json')[options.env]
            }),
            new ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.$': 'jquery',
                'window.jQuery': 'jquery',
                toastr: 'toastr',
                Popper: ['popper.js', 'default'],
                Util: 'exports-loader?Util!bootstrap/js/dist/util'
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: function(a, b) {
                    const entryPoints = ['polyfills', 'vendor', 'main', 'global'];
                    return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
                },
                inject: 'body',
                xhtml: true,
                minify: isProd ? {
                    caseSensitive: true,
                    collapseWhitespace: true,
                    keepClosingSlash: true
                } : false
            }),
            new CopyWebpackPlugin([
                { from: helpers.root('src/favicon.ico'), to: 'favicon.ico' },
                { from: helpers.root('src/404.html'), to: '404.html' }
            ]),
            new AngularCompilerPlugin({
                tsConfigPath: metadata.tsConfigPath,
                mainPath: entry.main,
                sourceMap: !isProd,
                skipCodeGeneration: !metadata.AOT,
                hostReplacementPaths: {
                    'src/environments/environment.ts': `src/environments/environment.${isProd ? 'prod.' : ''}ts`
                }
            }),
            new InlineManifestWebpackPlugin()
        ]
    };
};
