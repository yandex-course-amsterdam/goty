import { Router } from 'express'

import { newsController } from '../controllers'

const newsRouter = Router()

newsRouter.get('/all', newsController.getAllNews)

export { newsRouter }
