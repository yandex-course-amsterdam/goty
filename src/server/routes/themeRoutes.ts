import { Router } from 'express'

import { themeController } from '../controllers'

const themesRouter = Router()

themesRouter.get('/all', themeController.getAllThemes)

themesRouter.post('/', themeController.createTheme)

themesRouter.get('/', themeController.getTheme)

themesRouter.put('/', themeController.updateTheme)

export { themesRouter }
