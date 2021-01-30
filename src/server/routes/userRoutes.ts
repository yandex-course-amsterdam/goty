import { Router } from 'express'

import { userController } from '../controllers'

const usersRouter = Router()

usersRouter
  .post('/', userController.setUser)
  .get('/:id/theme', userController.getUserTheme)
  .post('/theme', userController.setUserTheme)

export { usersRouter }
