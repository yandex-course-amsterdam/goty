import { Router } from 'express'

import { userController } from '../controllers'

const usersRouter = Router()

usersRouter.get('/getTheme', userController.getUserTheme)

usersRouter.post('/setTheme', userController.setUserTheme)

export { usersRouter }
