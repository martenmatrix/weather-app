const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    client: {
      overlay: false,
    },

    static: {
      directory: path.join(__dirname, 'dist'),
    },

    port: 9000,
    hot: 'only',
  },

  module: {
      rules: [
            {
             test: /\.css$/i,
             use: ['style-loader', 'css-loader'],
            },
            {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
           },
           {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
           },
           {
             test: /\.html$/i,
             loader: 'html-loader',
           },
           {
             test: /\.m?js$/,
             exclude: /(node_modules|bower_components)/,
             use: {
               loader: 'babel-loader',
               options: {
                 presets: ['@babel/preset-env']
               }
             }
           }
      ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
};