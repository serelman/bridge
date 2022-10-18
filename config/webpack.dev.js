/* eslint-disable */

const { merge } = require('webpack-merge');
const openBrowser = require('react-dev-utils/openBrowser');

const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    onListening: () => {
      openBrowser('http://localhost:3000');
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
});
