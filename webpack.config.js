const path = require( 'path' );
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    context: __dirname,
    entry: './src/client/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/index.html",
            filename: "./index.html",
        })
    ]
};
