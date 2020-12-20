const fileRegex = /\.(jpe?g|png|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/

const fileLoader = {
  client: {
    test: fileRegex,
    use: 'file-loader'
  },
  server: {
    test: fileRegex,
    use: 'null-loader'
  }
}

module.exports = {
  fileLoader
}
