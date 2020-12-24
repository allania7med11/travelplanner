const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    context: __dirname,
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: "asset/resource",
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
    ],
    resolve: {
      alias: {
        Images: path.resolve(__dirname, "src/client/images"),
        Data: path.resolve(__dirname, "src/client/data"),
      },
    }
}