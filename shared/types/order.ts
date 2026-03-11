import type { CartItem } from './cart'

export type DeliveryMethod = 'warehouse' | 'locker' | 'courier'
export type PaymentMethod = 'online' | 'cod' | 'card-transfer'
export type OrderStatus = 'pending' | 'confirmed' | 'paid' | 'shipped'

export interface ContactMethod {
  noCall?: boolean
  messenger?: boolean
  phoneCall?: boolean
}

export interface CustomerDetails {
  fullName: string
  phone: string
  email?: string
}

export interface DeliveryDetails {
  region?: string
  city?: string
  cityRef?: string
  branch: string
  branchRef?: string
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
  contactMethod?: ContactMethod
  comment?: string
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
  contactMethod?: ContactMethod
  comment?: string
  promoCode?: string
}
