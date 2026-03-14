import { Router } from 'express'
import { z } from 'zod'
import { validatePromoCode } from '../services/promoCodeService.js'

export const promoCodeRouter = Router()

const validatePromoCodeSchema = z.object({
  code: z.string(),
  subtotal: z.number().min(0),
})

promoCodeRouter.post('/validate', (request, response) => {
  try {
    const { code, subtotal } = validatePromoCodeSchema.parse(request.body)
    const result = validatePromoCode(code, subtotal)

    if (result.isValid) {
      response.json({
        isValid: true,
        discount: result.discount,
        data: result.data,
      })
    } else {
      response.json({
        isValid: false,
        error: result.error,
      })
    }
  } catch (error) {
    response.status(400).json({
      isValid: false,
      error: 'Некоректні дані промокоду',
    })
  }
})
