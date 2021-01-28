import express from 'express'

import { config } from '../config'

import { log } from '../utils'
import { Comment } from '../models'

const controller = 'CommentController'

const {
  models: { aliases }
} = config

export const postComment = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const { id } = await Comment.create(req.body)
    const comment = await Comment.findOne({
      where: { id },
      include: [aliases.user]
    })
    return res.status(201).send(comment)
  } catch (error) {
    log({ controller, method: 'postComment', error })
    return res.status(400).send('There is a problem saving your comment')
  }
}

export const deleteComment = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await Comment.destroy({ where: { id: req.query.commentId } })
    return res.status(204).send()
  } catch (error) {
    log({ controller, method: 'postComment', error })
    return res.status(400).send('There is a problem deleting your comment')
  }
}
