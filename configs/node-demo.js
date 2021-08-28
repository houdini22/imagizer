const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './demo/node-demo.tsx',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'node-demo.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.tsx'],
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    'canvas': 'canvas',
    'fs': 'fs'
  }
}
