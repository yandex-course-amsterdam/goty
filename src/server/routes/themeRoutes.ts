import { Router } from 'express'

import { themeController } from '../controllers'

const themesRouter = Router()

themesRouter
  .get('/', themeController.getAllThemes)
  .post('/', themeController.createTheme)
  .get('/:id', themeController.getTheme)
  .put('/', themeController.updateTheme)

export { themesRouter }
