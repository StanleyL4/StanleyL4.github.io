const path = require('path');
const webpack = require('webpack')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const entry = "./src/index.js";
const {GenerateSW} = require('workbox-webpack-plugin');

//Generate Html file 
var HtmlWebpackPlugin = require('html-webpack-plugin');
//Generate css file
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {  
  mode: "production", // production / development
  entry: "./"+entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  // plugins: [new HtmlWebpackPlugin(),]
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer'),
                require('cssnano')({
                  preset: ['default', {
                    discardComments: {
                      removeAll: true
                    }
                  }]
                })
              ];
            }
          }
        },
        'sass-loader',
      ],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/react'],
      },
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }), new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      //Automatically load modules instead of having to import or require them everywhere.
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // new GenerateSW({
    //   swDest: 'sw.js',
    //   clientsClaim: true,
    // })
  ],
};
