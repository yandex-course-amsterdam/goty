import express from 'express'

import { config } from '../config'

import { format } from '../formatters'
import { logError } from '../utils'
import { User } from '../models'

const controller = 'UserController'

const {
  models: { aliases },
  status
} = config

export const setUser = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const row = await User.findOrCreate({
      where: { id: req.body.id },
      defaults: { ...req.body, theme_id: 1 }
    })
    const user = row.shift()
    return res.status(200).json({ status: status.success, payload: user })
  } catch (error) {
    logError({ controller, method: 'setUser', error })
    return res
      .status(400)
      .json({ status: status.error, message: 'There is a problem saving user' })
  }
}

export const getUserTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const userWithTheme = await User.findOne({
      where: { id: req.params.id },
      include: [aliases.theme]
    })
    // @ts-ignore
    const theme = format.theme(userWithTheme[aliases.theme])
    return res.status(200).json({ status: status.success, payload: theme })
  } catch (error) {
    logError({ controller, method: 'getUserTheme', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem getting theme'
    })
  }
}

export const setUserTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const { user_id: id, theme_id } = req.body
    await User.update(
      { theme_id },
      {
        where: { id }
      }
    )
    return res.status(201).json({
      status: status.success,
      payload: null
    })
  } catch (error) {
    logError({ controller, method: 'setUserTheme', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem setting theme for user'
    })
  }
}
