import express from 'express'

import { log } from '../utils'
import { Feedback } from '../models'

const controllerName = 'FeedbackController'

export const saveFeedback = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await Feedback.create(req.body)
    return res.status(200).send()
  } catch (error) {
    log(controllerName, 'saveFeedback', error)
    return res.status(400).send('There is a problem saving your feedback')
  }
}
