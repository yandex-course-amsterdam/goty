import express from 'express'

import { config } from '../config'

import { log } from '../utils'
import { News, Comment, Like } from '../models'

const controllerName = 'NewsController'

export const getAllNews = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const {
      models: { aliases }
    } = config
    const allNews = await News.findAll({
      include: [
        { model: Comment, as: aliases.comments, include: [aliases.user] },
        { model: Like, as: aliases.likes }
      ]
    })
    return res.status(201).send(allNews)
  } catch (error) {
    log(controllerName, 'getAllNews', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}
