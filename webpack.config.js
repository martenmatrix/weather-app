const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
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
             test: /\.m?js$/,
             exclude: /(node_modules|bower_components)/,
             use: {
               loader: 'babel-loader',
               options: {
                 presets: [['@babel/preset-env', {useBuiltIns: 'usage', corejs: 3}]],
                 inputSourceMap: false,
                 sourceMaps: 'both',
                 compact: false,
                }
            },
            },
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
            test: /\.(webm)$/i,
            type: 'asset/resource',
            },
            {
             test: /\.html$/i,
             loader: 'html-loader',
            }
      ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
};