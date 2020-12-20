const express = require('express')
const path = require('path')
const serverRenderMiddleware = require('./serverRenderMiddleware')

const app = express()

app.use('/', express.static(path.join(__dirname, 'build')))

app.get('*', serverRenderMiddleware)

module.exports = { app }
