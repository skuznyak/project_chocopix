import { Router } from 'express'
import { createOrderController } from '../controllers/ordersController.js'

export const orderRouter = Router()

orderRouter.post('/', createOrderController)
