import { Router } from 'express'

import { themeController } from '../controllers'

const themesRouter = Router()

themesRouter
  .get('/all', themeController.getAllThemes)
  .post('/', themeController.createTheme)
  .get('/', themeController.getTheme)
  .put('/', themeController.updateTheme)

export { themesRouter }
