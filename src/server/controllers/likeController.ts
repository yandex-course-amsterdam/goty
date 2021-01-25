import express from 'express'

import { log } from '../utils'
import { Like } from '../models'

const controllerName = 'LikeController'

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
      return res.status(204).send()
    }

    like = await Like.create(req.body)
    return res.status(200).send(like)
  } catch (error) {
    log(controllerName, 'postLike', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}
