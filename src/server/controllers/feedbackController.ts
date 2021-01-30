import express from 'express'

import { config } from '../config'
import { logError } from '../utils'
import { Feedback } from '../models'

const controller = 'FeedbackController'

const { status } = config

export const saveFeedback = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await Feedback.create(req.body)
    return res.status(200).json({ status: status.success, payload: null })
  } catch (error) {
    logError({ controller, method: 'saveFeedback', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem saving your feedback'
    })
  }
}
