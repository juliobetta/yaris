const path = require('path');
const webpack = require('webpack');
const WebpackChunkHash = require('webpack-chunk-hash');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const baseConfig = require('./base');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true, // default is false
    sourceMap: false,
    minimize: true,
    importLoaders: 1,
    localIdentName: '[name]--[local]--[hash:base64:8]'
  }
};

const publicPath = '/';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    publicPath,
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.[name].[chunkhash].js',
    chunkFilename: 'bundle.[name].[chunkhash].js',
    pathinfo: false
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          'less-loader'
        ]
      },
      {
        test: require.resolve('../src/index.js'),
        loader: 'imports-loader',
        query: { offlineRuntime: 'offline-plugin/runtime' }
      }
    ]
  },

  /**
   * @see https://stackoverflow.com/a/49429500/561610
   */
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      externals: [
        '/'
      ],
      // appShell: '/',
      cacheMaps: [
        {
          match: url => {
            // Don't return the cached index.html for API requests or /auth pages
            if (url.pathname.indexOf('/__/auth') === 0) return true;
            return new URL('/index.html', url);
          },
          requestType: ['navigate']
        }
      ],
      publicPath,
      relativePaths: false,
      caches: {
        main: [':rest:'],
        additional: [':externals:']
      },
      ServiceWorker: {
        navigateFallbackURL: '/',
        events: true,
        excludes: ['*.hot-update.*', '*__*']
      },
      AppCache: false
    }),

    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-analyzer.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }),

    new HtmlCriticalPlugin({
      base: path.join(path.resolve(__dirname), '../dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false
      }
    })
  ]
});
