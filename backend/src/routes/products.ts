import { Router } from 'express'
import { getProductByIdController, getProductsController } from '../controllers/productsController.js'

export const productRouter = Router()

productRouter.get('/', getProductsController)
productRouter.get('/:id', getProductByIdController)
