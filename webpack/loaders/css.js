const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postCSSImport = require('postcss-import')
const postCSSURL = require('postcss-url')
const postCSSPresetEnv = require('postcss-preset-env')
const postCSSReporter = require('postcss-reporter')
const postCSSBrowserReporter = require('postcss-browser-reporter')

const { isProduction } = require('../env')

const cssRegex = /\.css$/

const cssLoader = {
  client: {
    test: cssRegex,
    use: [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        query: {
          sourceMap: !isProduction,
          importLoaders: 1,
          modules: {
            localIdentName: isProduction
              ? '[hash:base64:5]'
              : '[local]__[hash:base64:5]'
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            postCSSImport({ addDependencyTo: webpack }),
            postCSSURL(),
            postCSSPresetEnv({
              stage: 2
            }),
            postCSSReporter(),
            postCSSBrowserReporter({
              disabled: isProduction
            })
          ]
        }
      }
    ]
  },
  server: {
    test: cssRegex,
    use: 'null-loader'
  }
}

module.exports = {
  cssLoader
}
