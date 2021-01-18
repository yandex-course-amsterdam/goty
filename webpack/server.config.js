const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { sourcePath, outPath } = require('./env')
const { jsLoader, cssLoader, svgLoader, fileLoader } = require('./loaders')

module.exports = {
  context: sourcePath,
  entry: './server/server.ts',
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: { __dirname: false, fs: 'empty', net: 'empty' },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      assets: path.resolve(__dirname, '../src/assets/'),
      icons: path.resolve(__dirname, '../src/icons/'),
      images: path.resolve(__dirname, '../src/images/'),
      shared: path.resolve(__dirname, '../src/shared/'),
      uikit: path.resolve(__dirname, '../src/uikit/')
    }
  },
  module: {
    rules: [
      jsLoader.server,
      cssLoader.server,
      svgLoader.server,
      fileLoader.server
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.min.css'
    })
  ],
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })]
}
