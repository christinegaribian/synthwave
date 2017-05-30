var path = require("path");
module.exports = {
  context: __dirname,
  entry: "./synthwaves.js",
  output: {
    path: path.resolve(__dirname),
  	filename: "./bundle.js"
  },
  module: {
  loaders: [
    {
      test: [/\.js?$/],
      exclude: /node_modules/,
    }
  ]
},
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", "*"]
  }
};
