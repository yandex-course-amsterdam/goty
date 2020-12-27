import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { serverRenderMiddleware } from './serverRenderMiddleware'
import { authMiddleware } from './authMiddleware'
import { invalidateMiddleware } from './invalidateMiddleware'

const app = express()

app
  .use(bodyParser())
  .use(cookieParser())
  .use(compression())
  .use('/', express.static(__dirname))

app.get('*', serverRenderMiddleware)

app.post('/createToken', authMiddleware)

app.post('/invalidateToken', invalidateMiddleware)

export { app }
