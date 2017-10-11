var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    entry: {
        'app': [
            'babel-polyfill',
            'react-hot-loader/patch',
            './app/client/js/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    node: {fs: "empty"},
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                },

            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { minimize: true }
                        },
                        {
                            loader: "sass-loader"
                        },
                        {
                            loader: "postcss-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },
    target: 'node',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        extractSass
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};