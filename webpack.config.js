const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map', // Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.
  mode: 'development',
  output: {
    // the hash is calculated from the code included in the js file, so if the code stays the same the hash also does
    // if a filename changes, the browser has it not in cache anymore, if the filename stays the same, it tries to get it from the cache
    // https://stackoverflow.com/questions/59194365/webpack-4-hash-and-contenthash-and-chunkhash-when-to-use-which
    filename: 'main.[contenthash].js',
    assetModuleFilename: 'assets/[contenthash][ext][query]',
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
             test: /\.css$/i,
             use: ['style-loader', 'css-loader',
                   {
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            "postcss-preset-env",
                            {
                              // Options
                            },
                          ],
                        ],
                      },
                    },
                  }, // add sass loader after postcss loader (https://youtu.be/TOb1c39m64A?list=PLmZPx_9ZF_sB4orswXdpThGMX9ii2uP7Z&t=2155)
            ],
            },
            {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset', // determines on the size (max size is 8kb) of the file, whether it should be inlined(js in assets directory) or in the assets directory
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
            },
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', { "debug": true, useBuiltIns: 'usage', corejs: 3 }]],
                  inputSourceMap: false,
                  sourceMaps: 'both',
                  compact: false,
                 }
               },
             },
      ],
  },


  // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || "disabled",
    }),
  ],
};