const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const { isProduction, sourcePath, outPath } = require('./env')
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
      images: path.resolve(__dirname, '../src/images/'),
      icons: path.resolve(__dirname, '../src/icons/'),
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
    })
  ],
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })]
}
