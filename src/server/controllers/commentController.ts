import express from 'express'

import { config } from '../config'

import { log } from '../utils'
import { Comment } from '../models'

const controllerName = 'CommentController'

export const postComment = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const {
      models: { aliases }
    } = config
    const { id } = await Comment.create(req.body)
    const comment = await Comment.findOne({
      where: { id },
      include: [aliases.user]
    })
    return res.status(201).send(comment)
  } catch (error) {
    log(controllerName, 'postComment', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}
