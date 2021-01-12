const webpack = require('webpack')
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

const { isProduction, sourcePath, outPath } = require('./env')
const { jsLoader, cssLoader, svgLoader, fileLoader } = require('./loaders')

module.exports = {
  context: sourcePath,
  entry: {
    app: './client.tsx'
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  node: {
    fs: 'empty',
    net: 'empty'
  },
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
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.min.css'
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
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map'
}
