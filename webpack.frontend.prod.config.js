require('extract-text-webpack-plugin');
const webpack = require('webpack');
const webpackSettings = require('./webpack.frontend.dev.config.js');

const optimizingPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.OccurrenceOrderPlugin,
  new webpack.optimize.UglifyJsPlugin
];

webpackSettings.plugins = optimizingPlugins;
webpackSettings.entry = webpackSettings.entry.filter((entryName) => {
  return (entryName.indexOf('hot/dev-server') === -1);
});
webpackSettings.externals = {
  'canvas': 'canvas',
  'fs': 'fs'
};
webpackSettings.output.filename = 'imagizer.browser.prod.js';

module.exports = webpackSettings;