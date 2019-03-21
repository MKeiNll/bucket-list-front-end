const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  context: path.resolve(__dirname, "src"),
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
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
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: "awesome-typescript-loader"
        },
        exclude: /node_modules/
      }
    ]
  }
};
