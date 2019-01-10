const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('yargs').argv;
const config = require('./config');
const path = require('path');

process.env.NODE_ENV = argv.p ? 'production' : 'development';

let rules = [{
    test: /\.(svg|woff|woff2|ttf|eot)$/i,
    loaders: 'file-loader?hash=sha512&digest=hex&name=assets/fonts/[hash].[ext]'
}];

if (!argv.p) {
    rules.push({
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: "pre"
    });
}

module.exports = {
    entry: {
        'vendor': [
            'bootstrap-loader',
            'jquery',
            'tether',
            'tether-drop',
            'tether-tooltip',
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/forms',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@ng-bootstrap/ng-bootstrap',
            'ng2-webstorage'
        ]
    },
    devtool: argv.p ? '' : 'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
    },
    module: {
        exprContextCritical: false,
        rules: rules
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, `../${config.dllPath}`),
        library: '[name]'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new webpack.DllPlugin({
            name: '[name]',
            path: `${config.dllPath}/[name].json`
        }),
        new ExtractTextPlugin("vendor.css")
    ]
};
