// npm i --save-dev typescript ts-loader webpack webpack-dev-server webpack-cli
// webpack config has a node js export
const path = require("path");
module.exports = {
  entry: "./src/app.ts",

  output: {
    filename: "bundle.js",
    // needs an absolute path
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        // use package ts-loader to load ts extention it will use the tsconfig by default
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
//  it generates a source map and includes it inline within the generated JavaScript bundle
  devtool:'inline-source-map',
  resolve: {
    // we will tell the webpack which extenstions it will add to the end of the imports
    extensions: [".ts", ".js"],
  },
};
