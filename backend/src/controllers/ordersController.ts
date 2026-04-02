import type { Request, Response } from 'express'
import type { Order } from '@chocopix/shared'
import { productsCatalog } from '@chocopix/shared'
import { z } from 'zod'
import { sendOrderToTelegram } from '../services/telegramService.js'
import { sendOrderToEmail } from '../services/email.js'
import { validatePromoCode } from '../services/promoCodeService.js'

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
const generateOrderNumber = () => `CP-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`

export const createOrderController = async (request: Request, response: Response) => {
  const orderNotificationEmails = (process.env.ORDER_NOTIFICATION_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)

  const payload = createOrderSchema.parse(request.body)
  const subtotal = payload.items.reduce((sum, item) => {
    const product = productsCatalog.find((entry) => entry.id === item.productId)
    return sum + (product?.price ?? 0) * item.quantity
  }, 0)

  let discount = 0
  let appliedPromoCode: string | undefined
  const normalizedPromoCode = payload.promoCode?.trim().toUpperCase()

  if (normalizedPromoCode) {
    const promoValidation = validatePromoCode(normalizedPromoCode, subtotal)

    if (!promoValidation.isValid) {
      response.status(400).json({
        message: 'Промокод недійсний або термін його дії закінчився',
      })
      return
    }

    discount = promoValidation.discount ?? 0
    appliedPromoCode = normalizedPromoCode
  }

  const total = Math.max(subtotal - discount, 0)
  const id = crypto.randomUUID()
  const order: Order = {
    id,
    orderNumber: generateOrderNumber(),
    ...payload,
    promoCode: appliedPromoCode,
    appliedPromoCode,
    subtotal,
    discount,
    status: 'pending',
    total,
    createdAt: new Date().toISOString(),
  }

  orders.set(id, order)

  console.log('Order received:', JSON.stringify(payload, null, 2))

  const notificationOrderData = {
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
    promoCode: order.appliedPromoCode,
    discount: order.discount || 0,
    total: order.total,
    subtotal: order.subtotal || 0,
  }

  // Додаткові сповіщення не блокують відповідь клієнту.
  void sendOrderToTelegram(notificationOrderData).catch(console.error)
  void sendOrderToEmail(notificationOrderData, orderNotificationEmails).catch(console.error)

  response.status(201).json(order)
}
