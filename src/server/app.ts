import path from 'path'

import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import {
  authRouter,
  usersRouter,
  themesRouter,
  feedbackRouter,
  newsRouter
} from './routes'

import { serverRenderMiddleware } from './serverRenderMiddleware'

const app = express()

app
  .use(express.json())
  .use(cookieParser())
  .use(compression())
  .use('/', express.static(__dirname))
  .use('/auth', authRouter)
  .use('/users', usersRouter)
  .use('/themes', themesRouter)
  .use('/feedback', feedbackRouter)
  .use('/news', newsRouter)

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
