import express, { Router } from 'express'
import { Theme, UserTheme } from '../models'
import { format } from '../formatters'

const themes = Router()

themes.get(
  '/all',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const allThemes = await Theme.findAll()
      const allThemesFormatted = format.theme(allThemes)
      return res.status(201).send(allThemesFormatted)
    } catch (e) {
      console.log(e)
      return res.status(400).send('There is a problem saving your theme')
    }
  }
)

themes.post(
  '/',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      await Theme.create(req.body)
      return res.status(201).send('Theme has been saved succesfully')
    } catch (e) {
      console.log(e)
      return res.status(400).send('There is a problem saving your theme')
    }
  }
)

themes.get(
  '/',
  async (
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
    } catch (e) {
      console.log(e)
      return res.sendStatus(400).send('There is a problem getting your theme')
    }
  }
)

themes.put(
  '/',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const theme = await Theme.findOne({
        where: { id: req.query.id }
      })
      theme!.baseColor = req.body.baseColor
      await theme!.save()

      return res.status(201).send(theme)
    } catch (e) {
      console.log(e)
      return res.sendStatus(400).send('There is a problem updating your theme')
    }
  }
)

themes.delete(
  '/',
  async (
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
    } catch (e) {
      console.log(e)
      return res.sendStatus(400).send('There is a problem deleting your theme')
    }
  }
)

export { themes }
