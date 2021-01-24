import express from 'express'

import { config } from '../config'

import { format } from '../formatters'
import { log } from '../utils'
import { Theme, UserTheme } from '../models'

const controllerName = 'UserController'

export const getUserTheme = async (
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

    let theme

    if (!userThemeWithTheme) {
      // Выставляем дефолтную тему, если юзер не найден
      await UserTheme.create({ userId: req.query.userId, themeId: 1 })
      theme = format.theme((await Theme.findOne({ where: { id: 1 } })) as Theme)
    } else {
      // @ts-ignore
      theme = format.theme(userThemeWithTheme[aliases.UserTheme])
    }

    return res.status(200).send(theme)
  } catch (error) {
    log(controllerName, 'getUserTheme', error)
    return res.sendStatus(400).send('There is a problem getting theme')
  }
}

export const setUserTheme = async (
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
    log(controllerName, 'setUserTheme', error)
    return res.sendStatus(400).send('There is a problem setting theme for user')
  }
}
