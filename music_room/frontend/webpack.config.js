//webpack bundles all our javascript into one file, serves that one file to the browser

const path = require("path");
const webpack = require("webpack");

//src/index.js entry js file, and output it to static/frontend
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  //exclude node_modules folder, use babel loader for all of this
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  //minimize our js, so we have a faster load time in browser
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};