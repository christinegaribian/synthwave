var path = require("path");
module.exports = {
  context: __dirname,
  entry: "./synthwaves.js",
  output: {
    path: path.resolve(__dirname),
    publicPath: "/",
  	filename: "bundle.js"
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", "*"]
  }
};
