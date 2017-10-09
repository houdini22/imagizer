require('extract-text-webpack-plugin')

const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'babel-polyfill',
    './src/main.js',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'imagizer.js',
    library: '',
    libraryTarget: 'commonjs'
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin
  ],
  externals: {
    'canvas': 'canvas',
    'fs': 'fs'
  }
}