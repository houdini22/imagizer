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
    filename: 'imagizer.browser.dev.js',
    library: 'Imagizer',
    libraryTarget: 'var'
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [],
  externals: {
    'canvas': 'canvas',
    'fs': 'fs'
  }
};