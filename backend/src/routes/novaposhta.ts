import { Router } from 'express'
import {
  getAreasController,
  getCitiesController,
  getWarehousesController,
  getDeliveryCostController,
} from '../controllers/novaposhtaController.js'

export const novaPoshtaRouter = Router()

novaPoshtaRouter.use((_req, _res, next) => {
  console.log('Nova Poshta router hit')
  next()
})

novaPoshtaRouter.get('/areas', (req, res, next) => {
  console.log('GET /api/np/areas')
  next()
}, getAreasController)
novaPoshtaRouter.get('/cities', getCitiesController)
novaPoshtaRouter.get('/warehouses', getWarehousesController)
novaPoshtaRouter.get('/delivery-cost', getDeliveryCostController)
