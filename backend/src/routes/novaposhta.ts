import { Router } from 'express'
import {
  getAreasController,
  getCitiesController,
  getWarehousesController,
  getDeliveryCostController,
} from '../controllers/novaposhtaController.js'

export const novaPoshtaRouter = Router()

novaPoshtaRouter.get('/areas', getAreasController)
novaPoshtaRouter.get('/cities', getCitiesController)
novaPoshtaRouter.get('/warehouses', getWarehousesController)
novaPoshtaRouter.get('/delivery-cost', getDeliveryCostController)
