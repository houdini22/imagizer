require('extract-text-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    './src/main.js',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'imagizer.node.dev.js',
    library: '',
    libraryTarget: 'commonjs'
  },
  resolve: {
    //modulesDirectories: ['node_modules'],
    extensions: ['.js'],
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /node_modules/,
        include: /node_modules\/canvas/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {test: /\.node$/, loader: 'node-loader'}
    ],
  },
  plugins: [],
  externals: {
    'canvas': 'canvas',
    'fs': 'fs'
  },
  target: 'node'
};