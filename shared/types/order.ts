import type { CartItem } from './cart'

export type DeliveryMethod = 'warehouse' | 'locker' | 'courier'
export type PaymentMethod = 'online' | 'cod' | 'card-transfer'
export type OrderStatus = 'pending' | 'confirmed' | 'paid' | 'shipped'

export interface CustomerDetails {
  fullName: string
  phone: string
  email?: string
}

export interface DeliveryDetails {
  city: string
  branch: string
  address?: string
  method: DeliveryMethod
  estimatedDate: string
}

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  customer: CustomerDetails
  delivery: DeliveryDetails
  paymentMethod: PaymentMethod
  status: OrderStatus
  promoCode?: string
  total: number
  createdAt: string
}

export interface CreateOrderPayload {
  items: CartItem[]
  customer: CustomerDetails
  delivery: DeliveryDetails
  paymentMethod: PaymentMethod
  promoCode?: string
}
