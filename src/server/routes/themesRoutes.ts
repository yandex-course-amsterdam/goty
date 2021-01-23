import express, { Router } from 'express'
import { Theme, UserTheme } from '../models'
import { format } from '../formatters'

const themesRouter = Router()

themesRouter.get(
  '/all',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const allThemes = await Theme.findAll()
      const allThemesFormatted = format.theme(allThemes)
      return res.status(201).send(allThemesFormatted)
    } catch (error) {
      console.log(error)
      return res.status(400).send('There is a problem saving your theme')
    }
  }
)

themesRouter.post(
  '/',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      await Theme.create(req.body)
      return res.status(201).send('Theme has been saved succesfully')
    } catch (error) {
      console.log(error)
      return res.status(400).send('There is a problem saving your theme')
    }
  }
)

themesRouter.get(
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
    } catch (error) {
      console.log(error)
      return res.sendStatus(400).send('There is a problem getting your theme')
    }
  }
)

themesRouter.put(
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
    } catch (error) {
      console.log(error)
      return res.sendStatus(400).send('There is a problem updating your theme')
    }
  }
)

themesRouter.delete(
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
    } catch (error) {
      console.log(error)
      return res.sendStatus(400).send('There is a problem deleting your theme')
    }
  }
)

export { themesRouter }
