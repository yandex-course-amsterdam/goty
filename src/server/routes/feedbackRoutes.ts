import { Router } from 'express'

import { feedbackController } from '../controllers'

const feedbackRouter = Router()

feedbackRouter.post('/', feedbackController.saveFeedback)

export { feedbackRouter }
