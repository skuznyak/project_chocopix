import { Router } from 'express'
import { getCitiesController, getWarehousesController } from '../controllers/novaposhtaController.js'

export const novaPoshtaRouter = Router()

novaPoshtaRouter.get('/cities', getCitiesController)
novaPoshtaRouter.get('/warehouses', getWarehousesController)
