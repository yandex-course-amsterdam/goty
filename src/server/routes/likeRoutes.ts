import { Router } from 'express'

import { likeController } from '../controllers'

const likeRouter = Router()

likeRouter.post('/', likeController.postLike)

export { likeRouter }
