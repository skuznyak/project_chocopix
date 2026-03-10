import type { Request, Response } from 'express'
import { z } from 'zod'
import { sendCallbackToTelegram } from '../services/telegram.js'

const createCallbackSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  comment: z.string().max(250).optional(),
})

export const createCallbackController = async (request: Request, response: Response) => {
  const payload = createCallbackSchema.parse(request.body)

  await sendCallbackToTelegram(payload)

  response.status(201).json({
    success: true,
  })
}
