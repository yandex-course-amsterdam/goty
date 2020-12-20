const svgRegex = /\.svg$/

const svgLoader = {
  client: {
    test: svgRegex,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true
        }
      }
    ]
  },
  server: {
    test: svgRegex,
    use: 'null-loader'
  }
}

module.exports = {
  svgLoader
}
