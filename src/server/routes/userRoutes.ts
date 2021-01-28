import { Router } from 'express'

import { userController } from '../controllers'

const usersRouter = Router()

usersRouter
  .post('/', userController.setUser)
  .get('/getTheme', userController.getUserTheme)
  .post('/setTheme', userController.setUserTheme)

export { usersRouter }
