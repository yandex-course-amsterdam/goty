import { Router } from 'express'

import { commentController } from '../controllers'

const commentsRouter = Router()

commentsRouter
  .post('/', commentController.postComment)
  .delete('/:id', commentController.deleteComment)

export { commentsRouter }
