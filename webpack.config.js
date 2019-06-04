const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyFiles = require("copy-webpack-plugin");

module.exports = {
    devtool: "source-map",
    entry: "./src/js/main.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9875
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: "src/html/index.html",
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: "src/html/quiz.html",
            filename: 'quiz.html'
        }),
        new CopyFiles([
            {
                from: "src/img",
                to: path.join(__dirname, "dist/img")
            }
        ])
    ],

};