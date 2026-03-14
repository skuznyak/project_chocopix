import type { CreateOrderPayload, Order } from '@chocopix/shared'
import { apiClient, USE_MOCK } from '@/api/client'
import { readStorage, writeStorage } from '@/utils/browserStorage'

const STORAGE_KEY = 'chocopix-orders'

const readOrders = (): Order[] => readStorage<Order[]>(STORAGE_KEY, [])

export const createOrder = async (payload: CreateOrderPayload) => {
  if (!USE_MOCK) {
    const response = await apiClient.post<Order>('/orders', payload)
    return response.data
  }

  const order: Order = {
    id: crypto.randomUUID(),
    orderNumber: `CP-${Date.now().toString().slice(-6)}`,
    items: payload.items,
    customer: payload.customer,
    delivery: payload.delivery,
    paymentMethod: payload.paymentMethod,
    promoCode: payload.promoCode,
    appliedPromoCode: payload.promoCode,
    subtotal: payload.subtotal,
    discount: payload.discount,
    total: payload.total ?? 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  const orders = readOrders()
  writeStorage(STORAGE_KEY, [order, ...orders])
  return order
}

export const getOrderStatus = async (id: string) => {
  if (!USE_MOCK) {
    const response = await apiClient.get<Order>(`/orders/${id}`)
    return response.data
  }

  const orders = readOrders()
  const order = orders.find((item) => item.id === id)

  if (!order) {
    throw new Error('Order not found')
  }

  return order
}
