import express from 'express'

import { config } from '../config'
import { logError } from '../utils'
import { Like } from '../models'

const controller = 'LikeController'

const { status } = config

export const postLike = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    let like = await Like.findOne({ where: req.body })

    // если лайк такого типа для данной новости от данного юзера есть, его нужно удалить
    if (like) {
      like.destroy()
      // возвращаем id удалённого лайка для выполнения логики на фронте
      return res.status(204).json({
        status: 'success',
        payload: null
      })
    }

    like = await Like.create(req.body)
    return res.status(200).json({ status: status.success, payload: like })
  } catch (error) {
    logError({ controller, method: 'postLike', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem saving your theme'
    })
  }
}
