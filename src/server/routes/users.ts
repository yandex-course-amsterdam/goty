import express, { Router } from 'express'

import { config } from '../config'

import { format } from '../formatters'
import { UserTheme } from '../models'

const users = Router()

users.get(
  '/getTheme',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const {
        models: { aliases }
      } = config
      const userThemeWithTheme = await UserTheme.findOne({
        where: { userId: req.query.userId },
        include: [aliases.UserTheme]
      })

      // Ожидаю, что findOne с подобным запросом вернёт тайпинг, в котором будет фигурировать Theme
      // Не лучшее решение ставить ts-ignore, но я уже слишком много времени убил на темизацию
      // Жопа горит, убийца плачет
      // @ts-ignore
      const theme = format.theme(userThemeWithTheme![aliases.UserTheme])

      return res.status(200).send(theme)
    } catch (error) {
      console.log(error)
      return res.sendStatus(400).send('There is a problem getting theme')
    }
  }
)

users.post(
  '/setTheme',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const userTheme = await UserTheme.findOne({
        where: { userId: req.body.userId }
      })

      if (userTheme) {
        userTheme.destroy()
      }

      await UserTheme.create(req.body)
      return res.status(201).send('Theme is set for user successfully')
    } catch (error) {
      console.log(error)
      return res
        .sendStatus(400)
        .send('There is a problem setting theme for user')
    }
  }
)

export { users }
