const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ENV = 'dev';
const execSync = require('child_process').execSync;
const fs = require('fs');
const ddlPath = './dll/vendor.json';
const config = require('./config');

if (!fs.existsSync(ddlPath)) {
    execSync('webpack --config config/webpack.vendor.js');
}

module.exports = webpackMerge(commonConfig({env: ENV}), {
    devtool: 'source-map',
    devServer: {
        contentBase: [path.resolve(`${config.dist}`), path.resolve('data')],
        proxy: {
            '/aici': {
                target: 'http://10.1.234.50:37300',
                secure: false
            },
            '/uaa': {
                target: 'http://10.1.234.50:37300',
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
        path: path.resolve(`${config.dist}`),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'tslint-loader'
                ],
                exclude: ['node_modules', /reflect-metadata/, /rxjs/]
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
        new CopyWebpackPlugin([
            {
                context: path.resolve(`${config.dllPath}/assets/`),
                from: '**/*',
                to: path.resolve(`${config.dist}/assets/`)
            },
            {
                context: path.resolve(`${config.dllPath}`),
                from: '*.map',
                to: path.resolve(`${config.dist}`)
            }
        ]),
        new ExtractTextPlugin('styles.css'),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new WriteFilePlugin(),
        new webpack.WatchIgnorePlugin([
            path.resolve('./src/test'),
        ])
    ]
});
