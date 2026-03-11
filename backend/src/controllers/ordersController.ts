import type { Request, Response } from 'express'
import type { Order, ContactMethod } from '@chocopix/shared'
import { z } from 'zod'
import { sendOrderToTelegram } from '../services/telegramService.js'

const createOrderSchema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number().min(1) })),
  customer: z.object({
    fullName: z.string().min(3),
    phone: z.string().min(10),
    email: z.string().email().optional(),
  }),
  delivery: z.object({
    city: z.string(),
    cityRef: z.string().optional(),
    branch: z.string(),
    branchRef: z.string().optional(),
    region: z.string().optional(),
    address: z.string().optional(),
    method: z.enum(['warehouse', 'locker', 'courier']),
    estimatedDate: z.string(),
  }),
  paymentMethod: z.enum(['online', 'cod', 'card-transfer']),
  contactMethod: z.object({
    noCall: z.boolean().optional(),
    messenger: z.boolean().optional(),
    phoneCall: z.boolean().optional(),
  }).optional(),
  comment: z.string().optional(),
  promoCode: z.string().optional(),
  total: z.number().optional(),
  subtotal: z.number().optional(),
})

const orders = new Map<string, Order>()

export const createOrderController = async (request: Request, response: Response) => {
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
  
  console.log('Order received:', JSON.stringify(payload, null, 2))
  
  // Vidpravlyayemo zamovlennya v Telegram (ne blokuemo vidpovid')
  sendOrderToTelegram({
    orderNumber: order.orderNumber,
    customer: order.customer,
    delivery: {
      region: order.delivery.region || '',
      city: order.delivery.city || '',
      branch: order.delivery.branch,
      method: order.delivery.method,
    },
    paymentMethod: order.paymentMethod,
    contactMethod: order.contactMethod,
    comment: order.comment,
    items: order.items,
    total: order.total || 0,
    subtotal: order.subtotal || 0,
  }).catch(console.error)
  
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
