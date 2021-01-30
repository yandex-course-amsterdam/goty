import express from 'express'

import { config } from '../config'

import { logError } from '../utils'
import { News, Comment, Like } from '../models'

const controller = 'NewsController'

const {
  models: { aliases },
  status
} = config

export const getAllNews = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const allNews = await News.findAll({
      include: [
        { model: Comment, as: aliases.comments, include: [aliases.user] },
        { model: Like, as: aliases.likes }
      ],
      order: [
        ['createdAt', 'ASC'],
        [{ model: Comment, as: aliases.comments }, 'createdAt', 'ASC']
      ]
    })
    return res.status(201).json({ status: status.success, payload: allNews })
  } catch (error) {
    logError({ controller, method: 'getAllNews', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem saving your theme'
    })
  }
}
