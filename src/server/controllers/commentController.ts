import express from 'express'

import { config } from '../config'

import { logError } from '../utils'
import { Comment } from '../models'

const controller = 'CommentController'

const {
  models: { aliases },
  status
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
    return res.status(201).json({ status: status.success, payload: comment })
  } catch (error) {
    logError({ controller, method: 'postComment', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem saving your comment'
    })
  }
}

export const deleteComment = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await Comment.destroy({ where: { id: req.params.id } })
    return res.status(204).json({
      status: status.success,
      payload: null
    })
  } catch (error) {
    logError({ controller, method: 'postComment', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem deleting your comment'
    })
  }
}
