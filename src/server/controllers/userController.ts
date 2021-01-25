import express from 'express'

import { config } from '../config'

import { format } from '../formatters'
import { log } from '../utils'
import { User } from '../models'

const controllerName = 'UserController'

const {
  models: { aliases }
} = config

export const setUser = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const row = await User.findOrCreate({
      where: { id: req.body.id },
      defaults: { ...req.body, themeId: 1 }
    })
    const user = row.shift()
    return res.status(200).send(user)
  } catch (error) {
    log(controllerName, 'setUser', error)
    return res.sendStatus(400).send('There is a problem saving user')
  }
}

export const getUserTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const userWithTheme = await User.findOne({
      where: { id: req.query.userId },
      include: [aliases.theme]
    })
    // @ts-ignore
    const theme = format.theme(userWithTheme[aliases.theme])
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
    const { userId: id, themeId } = req.body
    await User.update(
      { themeId },
      {
        where: { id }
      }
    )
    return res.status(201).send('Theme is set for user successfully')
  } catch (error) {
    log(controllerName, 'setUserTheme', error)
    return res.sendStatus(400).send('There is a problem setting theme for user')
  }
}
