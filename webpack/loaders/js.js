const { isProduction } = require('../env')

const jsLoader = {
  client: {
    test: /\.tsx?$/,
    use: [
      !isProduction && {
        loader: 'babel-loader',
        options: { plugins: ['react-hot-loader/babel'] }
      },
      'ts-loader'
    ].filter(Boolean)
  },
  server: {
    test: /\.tsx?$/,
    use: [
      !isProduction && {
        loader: 'babel-loader',
        options: { plugins: ['react-hot-loader/babel'] }
      },
      'ts-loader'
    ].filter(Boolean)
  }
}

module.exports = {
  jsLoader
}
