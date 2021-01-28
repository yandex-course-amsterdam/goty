import express from 'express'

import { config } from '../config'
import { Theme } from '../models'
import { format } from '../formatters'
import { logError } from '../utils'

const controller = 'ThemeController'

const { status } = config

export const getAllThemes = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const allThemes = await Theme.findAll()
    const allThemesFormatted = format.theme(allThemes)
    return res
      .status(201)
      .json({ status: status.success, payload: allThemesFormatted })
  } catch (error) {
    logError({ controller, method: 'getAllThemes', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem saving your theme'
    })
  }
}

export const createTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const theme = await Theme.create(req.body)
    return res.status(201).json({ status: status.success, payload: theme })
  } catch (error) {
    logError({ controller, method: 'createTheme', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem saving your theme'
    })
  }
}

export const getTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const theme = await Theme.findOne({
      where: {
        id: req.params.id
      }
    })
    return res.status(201).json({ status: status.success, payload: theme })
  } catch (error) {
    logError({ controller, method: 'getTheme', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem getting your theme'
    })
  }
}

export const updateTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const theme = await Theme.findOne({
      where: {
        id: req.params.id
      }
    })

    if (theme) {
      theme.baseColor = req.body.baseColor
      await theme.save()
      return res.status(201).json({ status: status.success, payload: theme })
    }

    throw new Error('There is no such theme :c')
  } catch (error) {
    logError({ controller, method: 'updateTheme', error })
    return res.status(400).json({
      status: status.error,
      message: 'There is a problem updating your theme'
    })
  }
}
