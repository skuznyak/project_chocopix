import { productsCatalog } from '@chocopix/shared'

export interface OrderNotificationData {
  orderNumber: string
  customer: {
    fullName: string
    phone: string
    email?: string
  }
  delivery: {
    region?: string
    city: string
    branch: string
    method: string
  }
  paymentMethod: string
  contactMethod?: {
    noCall?: boolean
    messenger?: boolean
    phoneCall?: boolean
  }
  comment?: string
  items: Array<{
    productId: string
    quantity: number
  }>
  total: number
  subtotal?: number
  discount?: number
  promoCode?: string
}

interface EnrichedItem {
  productId: string
  quantity: number
  name: string
  price: number
  lineTotal: number
}

export interface NormalizedOrderNotificationData {
  orderNumber: string
  customer: OrderNotificationData['customer']
  delivery: OrderNotificationData['delivery']
  paymentMethod: OrderNotificationData['paymentMethod']
  contactMethod?: OrderNotificationData['contactMethod']
  comment?: string
  items: EnrichedItem[]
  promoCode?: string
  subtotal: number
  discount: number
  total: number
  paymentText: string
  deliveryText: string
  deliveryCostText: string
  contactMethodText: string
}

export const normalizeOrderNotificationData = (
  order: OrderNotificationData,
): NormalizedOrderNotificationData => {
  const items = order.items.map((item) => {
    const product = productsCatalog.find((p) => p.id === item.productId)
    const price = product?.price ?? 0

    return {
      productId: item.productId,
      quantity: item.quantity,
      name: product?.name ?? item.productId,
      price,
      lineTotal: price * item.quantity,
    }
  })

  const calculatedSubtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)
  const subtotal = order.subtotal ?? calculatedSubtotal
  const discount = order.discount ?? 0
  const total = order.total

  const paymentText = order.paymentMethod === 'cod'
    ? '💳 Накладений платіж'
    : '💳 Переказ на картку'

  const deliveryText = order.delivery.method === 'warehouse'
    ? '🚚 Нова Пошта'
    : order.delivery.method === 'locker'
      ? '📦 Поштомат'
      : '🚴 Курʼєр'

  const FREE_DELIVERY_THRESHOLD = 2000
  const deliveryCostText = subtotal >= FREE_DELIVERY_THRESHOLD
    ? '✅ Безкоштовна'
    : '💰 За тарифами перевізника'

  const contactMethodText = order.contactMethod
    ? Object.entries(order.contactMethod)
        .filter(([_, value]) => value)
        .map(([key]) => {
          switch (key) {
            case 'noCall':
              return '❌ Не дзвонити'
            case 'messenger':
              return '💬 Написати в месенджер'
            case 'phoneCall':
              return '📞 Подзвонити'
            default:
              return ''
          }
        })
        .filter(Boolean)
        .join(', ')
    : ''

  return {
    orderNumber: order.orderNumber,
    customer: order.customer,
    delivery: order.delivery,
    paymentMethod: order.paymentMethod,
    contactMethod: order.contactMethod,
    comment: order.comment,
    items,
    promoCode: order.promoCode,
    subtotal,
    discount,
    total,
    paymentText,
    deliveryText,
    deliveryCostText,
    contactMethodText,
  }
}
