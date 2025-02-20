const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    global: path.resolve(__dirname, "global.js"),
    index: path.resolve(__dirname, "index.js"),
    listProducts: "./list-products.js",
    // addProducts: "./add-products.js", // optional if needed later
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
                includePaths: [path.resolve(__dirname, "node_modules")],
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["global", "index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./list-products.html",
      chunks: ["global", "listProducts"],
      filename: "list-products.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets/images", to: "assets/images" },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   template: "./add-products.html",
    //   chunks: ["addProducts", "global"],
    //   filename: "add-products.html",
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devServer: {
    static: "./dist",
    port: 9000,
    open: true,
    hot: true,
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "assets"),
    },
    extensions: [".js", ".scss"],
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
