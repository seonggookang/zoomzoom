// webpack.config.js
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/serverSocketIO.js",
  output: {
    path: __dirname + "/dist",
    filename: "serverSocketIO.bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hello Webpack Project!",
      // template: "./src/index.ejs"
      template: "./src/views/home.ejs"
    })
  ]
};
