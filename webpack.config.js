const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".jpg", ".png", ".gif", ".scss"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    stats: "errors-only",
    open: true,
    port: 9000,
    compress: true,
    proxy: {
      "/ester": {
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: "awesome-typescript-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader"
      }
    ]
  }
};
