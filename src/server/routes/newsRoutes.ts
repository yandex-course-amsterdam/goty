import { Router } from 'express'

import { newsController } from '../controllers'

const newsRouter = Router()

newsRouter.get('/', newsController.getAllNews)

export { newsRouter }
