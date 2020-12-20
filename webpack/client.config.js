const webpack = require('webpack')
const path = require('path')
const packageList = require('../package.json')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { isProduction, sourcePath, outPath } = require('./env')
const { jsLoader, cssLoader, svgLoader, fileLoader } = require('./loaders')

module.exports = {
  context: sourcePath,
  entry: {
    app: './main.tsx'
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: isProduction ? '[contenthash].js' : '[hash].js',
    chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      images: path.resolve(__dirname, '../src/images/'),
      icons: path.resolve(__dirname, '../src/icons/'),
      uikit: path.resolve(__dirname, '../src/uikit/')
    }
  },
  module: {
    rules: [
      jsLoader.client,
      cssLoader.client,
      svgLoader.client,
      fileLoader.client
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: isProduction
            ? 'vendor.[contenthash].js'
            : 'vendor.[hash].js',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new CleanWebpackPlugin(), // перетирает server.js
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
      },
      meta: {
        title: packageList.name,
        description: packageList.description,
        keywords: Array.isArray(packageList.keywords)
          ? packageList.keywords.join(',')
          : undefined
      }
    }),
    new InjectManifest({
      swSrc: './sw.js',
      maximumFileSizeToCacheInBytes: 8 * 1024 * 1024
    })
  ],
  devServer: {
    contentBase: outPath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  node: {
    fs: 'empty',
    net: 'empty'
  }
}
