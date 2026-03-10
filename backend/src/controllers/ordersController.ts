import type { Request, Response } from 'express'
import type { Order } from '@chocopix/shared'
import { z } from 'zod'

const createOrderSchema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number().min(1) })),
  customer: z.object({
    fullName: z.string().min(3),
    phone: z.string().min(10),
    email: z.string().email().optional(),
  }),
  delivery: z.object({
    city: z.string(),
    branch: z.string(),
    address: z.string().optional(),
    method: z.enum(['warehouse', 'locker', 'courier']),
    estimatedDate: z.string(),
  }),
  paymentMethod: z.enum(['online', 'cod', 'card-transfer']),
  promoCode: z.string().optional(),
})

const orders = new Map<string, Order>()

export const createOrderController = (request: Request, response: Response) => {
  const payload = createOrderSchema.parse(request.body)
  const id = crypto.randomUUID()
  const order: Order = {
    id,
    orderNumber: `CP-${Date.now().toString().slice(-6)}`,
    ...payload,
    status: 'pending',
    total: 0,
    createdAt: new Date().toISOString(),
  }

  orders.set(id, order)
  response.status(201).json(order)
}

export const getOrderStatusController = (request: Request<{ id: string }>, response: Response) => {
  const order = orders.get(request.params.id)

  if (!order) {
    response.status(404).json({ message: 'Order not found' })
    return
  }

  response.json(order)
}
