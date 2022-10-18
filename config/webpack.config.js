/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const getClientEnvironment = require('./env');

const env = getClientEnvironment();

const htmlMinimizerOptions = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};


module.exports = {
  mode: process.env.MODE,
  entry: './src/index.tsx',
  output: {
    path: paths.appBuild,
    publicPath: paths.servedPath,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    globalObject: 'this ',

  },
  devServer: {
    static: { directory: path.resolve(__dirname, './dist') },
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.babelIncludePaths,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                  },
                },
              },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        exclude: [/\.(js|jsx|ts|tsx|mjs|css|scss)$/, /\.html$/, /\.json$/],
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [paths.appNodeModules, paths.assets],
    extensions: paths.moduleFileExtensions.map((ext) => `.${ ext }`),
    alias: { '~': paths.appSrc },
  },
  plugins: [new HtmlWebpackPlugin({
    inject: true,
    title: 'Bridge',
    filename: 'index.html',
    chunks: ['main'],
    template: paths.appIndexHtml,
    minify: htmlMinimizerOptions,
  }),
    new webpack.DefinePlugin(env.stringified),
  ],
};
