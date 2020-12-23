import path from 'path'
import express from 'express'
import compression from 'compression'
import { serverRenderMiddleware } from './serverRenderMiddleware'

const app = express()

app.use(compression()).use('/', express.static(path.join(__dirname, 'build')))

app.get('*', serverRenderMiddleware)

export { app }
