import path from 'path'

import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { auth, users, themes } from './routes'

import { serverRenderMiddleware } from './serverRenderMiddleware'

const app = express()

app
  .use(express.json())
  .use(cookieParser())
  .use(compression())
  .use('/', express.static(__dirname))
  .use('/auth', auth)
  .use('/users', users)
  .use('/themes', themes)

app.get('/images/:src', (req, res) => {
  const { src } = req.params
  const options = {
    root: path.join(__dirname, '../')
  }

  // TODO: перенести статику в build/
  res.sendFile(`/src/images/${src}`, options)
})

app.get('*', serverRenderMiddleware)

export { app }
