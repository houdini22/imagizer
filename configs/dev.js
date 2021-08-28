const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/main.tsx',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'imagizer.dev.js',
    libraryTarget: 'commonjs2'
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
