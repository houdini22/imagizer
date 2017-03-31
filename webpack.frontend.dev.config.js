require('extract-text-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'sourcemap',
    entry: [
        'babel-polyfill',
        'webpack/hot/dev-server',
        './src/main.js',
    ],
    output: {
        path: path.resolve('./dist'),
        filename: 'imagizer.browser.js',
        library: 'Imagizer',
        libratyTarget: 'var'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
    },
    module: {
        loaders: [
            {
                test: [/\.js?$/],
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            },
        ],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
        'canvas': 'canvas',
        'fs': 'fs'
    }
};