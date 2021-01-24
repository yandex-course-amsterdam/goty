import express from 'express'
import { Theme, UserTheme } from '../models'
import { format } from '../formatters'
import { log } from '../utils'

const controllerName = 'ThemeController'

export const getAllThemes = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const allThemes = await Theme.findAll()
    const allThemesFormatted = format.theme(allThemes)
    return res.status(201).send(allThemesFormatted)
  } catch (error) {
    log(controllerName, 'getAllThemes', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}

export const createTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await Theme.create(req.body)
    return res.status(201).send('Theme has been saved succesfully')
  } catch (error) {
    log(controllerName, 'createTheme', error)
    return res.status(400).send('There is a problem saving your theme')
  }
}

export const getTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const theme = await Theme.findOne({
      where: {
        id: req.query.id
      }
    })
    return res.status(201).json(theme)
  } catch (error) {
    log(controllerName, 'getTheme', error)
    return res.sendStatus(400).send('There is a problem getting your theme')
  }
}

export const updateTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    const theme = await Theme.findOne({
      where: {
        id: req.query.id
      }
    })
    theme!.baseColor = req.body.baseColor
    await theme!.save()

    return res.status(201).send(theme)
  } catch (error) {
    log(controllerName, 'updateTheme', error)
    return res.sendStatus(400).send('There is a problem updating your theme')
  }
}

export const deleteTheme = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  try {
    await UserTheme.destroy({
      where: {
        userId: req.query.userId,
        themeId: req.query.themeId
      }
    })
    return res.status(201).send('Theme has been deleted succesfully')
  } catch (error) {
    log(controllerName, 'deleteTheme', error)
    return res.sendStatus(400).send('There is a problem deleting your theme')
  }
}