import express from 'express'
import compression from 'compression'
import { serverRenderMiddleware } from './serverRenderMiddleware'

const app = express()

app.use(compression()).use('/', express.static(__dirname))

app.get('*', serverRenderMiddleware)

export { app }
