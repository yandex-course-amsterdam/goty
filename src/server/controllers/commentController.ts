import express from 'express'

import { log } from '../utils'
import { Comment } from '../models'

const controllerName = 'CommentController'

export const postComment = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await Comment.create(req.body)
    return res.status(201).send()
  } catch (error) {
    log(controllerName, 'postComment', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}
