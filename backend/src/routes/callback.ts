import { Router } from 'express'
import { createCallbackController } from '../controllers/callbackController.js'

export const callbackRouter = Router()

callbackRouter.post('/', createCallbackController)
