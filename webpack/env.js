const path = require('path')

const isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'
const sourcePath = path.join(__dirname, '../src')
const outPath = path.join(__dirname, '../build')

module.exports = { isProduction, sourcePath, outPath }
