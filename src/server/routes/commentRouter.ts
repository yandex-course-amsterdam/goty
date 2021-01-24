import { Router } from 'express'

import { commentController } from '../controllers'

const commentsRouter = Router()

commentsRouter.get('/', commentController.postComment)

export { commentsRouter }
