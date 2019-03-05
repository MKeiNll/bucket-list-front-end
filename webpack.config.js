const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
    entry: "./index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
	context: path.resolve(__dirname, 'src'),
	plugins: [
     new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
	devServer: {
     contentBase: path.resolve(__dirname, 'public'),
     stats: 'errors-only',
     open: true,
     port: 9000,
     compress: true,
	 proxy: {
		 '/api': {
       target: 'http://localhost:8080',
       secure: false,
       changeOrigin: true
		 }
     }
	},
	module: {
        rules: [{
         test: /\.css$/,
         use: ["style-loader", "css-loader"]
        },
		{
		 test: /\.js$/,
		 use: {
			loader: 'babel-loader',
			options: {
            presets: ['@babel/env', '@babel/react']
        }
    }
}]
    }
}