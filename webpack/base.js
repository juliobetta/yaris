/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const getClientEnvironment = require('./config/env');

const env = getClientEnvironment();
const root = '..';

module.exports = {
  context: path.resolve(__dirname, `${root}/src`),

  entry: {
    app: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/media/[name].[ext]'
        }
      }
    ]
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      path.resolve(__dirname, `${root}/src`),
      path.resolve(__dirname, `${root}/src/app`),
      path.resolve(__dirname, `${root}/src/theme`),
      path.resolve(__dirname, `${root}/node_modules`)
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.DefinePlugin(env.stringified),

    new LodashModuleReplacementPlugin({
      shorthands: true,
      flattening: true,
      currying: true,
      deburring: true,
      chaining: true,
      paths: true,
      caching: true
    }),

    new HtmlWebpackPlugin({
      title: env.raw.PROJECT_NAME,
      filename: 'index.html',
      template: 'index.html',
      favicon: 'favicon.ico',
      production: process.env.NODE_ENV === 'production',
      development: !!process.env.STAGING || process.env.NODE_ENV === 'development',
      inject: 'body'
    }),

    new WebpackPwaManifest({
      name: env.raw.PROJECT_NAME,
      short_name: env.raw.PROJECT_NAME,
      description: '',
      theme_color: '#0BA14C',
      background_color: '#FFFFFF',
      ios: true,
      inject: true,
      fingerprints: true,
      orientation: 'portrait',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true
        },
        {
          src: path.resolve('src/assets/icon.png'),
          size: 1024,
          ios: 'startup'
        }
      ]
    })
  ]
};
