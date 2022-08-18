const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/js/app.js",
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.[chunkhash].bundle.js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "dist/index.html",
      hash: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/img", to: "img" },
        { from: "src/assets", to: "assets" },
        { from: "src/favicon.png", to: "favicon.png" },
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/service-worker.js", to: "service-worker.js" },
        { from: "src/_redirects", to: "." }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|gif|png|eot|woff|ttf)$/,
        use: ["url-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};
