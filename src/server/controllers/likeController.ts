import express from 'express'

import { log } from '../utils'
import { Like } from '../models'

const controllerName = 'LikeController'

export const postLike = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await Like.create(req.body)
    return res.status(200).send()
  } catch (error) {
    log(controllerName, 'postLike', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}
