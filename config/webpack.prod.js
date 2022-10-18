/* eslint-disable */

const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = require('./webpack.config');
const getClientEnvironment = require('./env');

const env = getClientEnvironment();

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = merge(config, {
  mode: 'production',
  bail: true,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash:8].css',
      ignoreOrder: true,
    }),
    new CopyPlugin({ patterns: [{ from: 'public', globOptions: { ignore: ['**/index.html'] } }] }),
  ],
  optimization: {
    minimize: true,
  },
});
