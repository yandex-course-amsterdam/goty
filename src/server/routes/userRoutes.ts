import { Router } from 'express'

import { userController } from '../controllers'

const usersRouter = Router()

usersRouter
  .post('/', userController.setUser)
  .get('/theme/:id', userController.getUserTheme)
  .post('/theme', userController.setUserTheme)

export { usersRouter }
