import { Router } from 'express'

import { commentController } from '../controllers'

const commentsRouter = Router()

commentsRouter.post('/', commentController.postComment)

commentsRouter.delete('/', commentController.deleteComment)

export { commentsRouter }
