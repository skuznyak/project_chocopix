import { Router } from 'express'
import { createOrderController, getOrderStatusController } from '../controllers/ordersController.js'

export const orderRouter = Router()

orderRouter.post('/', createOrderController)
orderRouter.get('/:id', getOrderStatusController)
