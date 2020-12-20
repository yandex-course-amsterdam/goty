const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'
const sourcePath = path.join(__dirname, './')
const outPath = path.join(__dirname, './build')

module.exports = {
  context: sourcePath,
  entry: './src/server/server.ts',
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: { __dirname: false },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
      images: path.resolve(__dirname, 'src/images/'),
      icons: path.resolve(__dirname, 'src/icons/'),
      uikit: path.resolve(__dirname, 'src/uikit/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: { plugins: ['react-hot-loader/babel'] }
          },
          'ts-loader'
        ].filter(Boolean)
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new CleanWebpackPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty'
  },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })]
}
