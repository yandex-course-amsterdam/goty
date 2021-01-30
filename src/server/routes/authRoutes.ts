import { Router } from 'express'

import { authController } from '../controllers'

const authRouter = Router()

authRouter
  .post('/createToken', authController.createJWTToken)
  .post('/invalidateToken', authController.invalidateToken)

export { authRouter }
