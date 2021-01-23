import express, { Router } from 'express'
import { Feedback } from '../models'

const feedbackRouter = Router()

feedbackRouter.post(
  '/',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      await Feedback.create(req.body)
      return res.status(200).send()
    } catch (err) {
      console.log(err)
      return res.status(400).send('There is a problem saving your feedback')
    }
  }
)

export { feedbackRouter }
