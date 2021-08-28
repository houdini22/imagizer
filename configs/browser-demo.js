const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./demo/browser-demo.tsx"],
  output: {
    path: path.resolve("./dist"),
    filename: "browser-demo.js",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".tsx"],
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  externals: {
    canvas: "canvas",
    fs: "fs",
  },
};
