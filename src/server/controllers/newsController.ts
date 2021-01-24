import express from 'express'

import { log } from '../utils'
import { News } from '../models'

const controllerName = 'NewsController'

export const getAllNews = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const allNews = await News.findAll()
    return res.status(201).send(allNews)
  } catch (error) {
    log(controllerName, 'getAllNews', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}
