import axios from 'axios'
import { productsCatalog } from '@chocopix/shared'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ''

interface OrderData {
  orderNumber: string
  customer: {
    fullName: string
    phone: string
    email?: string
  }
  delivery: {
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
}

export const sendOrderToTelegram = async (order: OrderData) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured')
    return
  }

  // Отримуємо інформацію про товари з каталогу
  const itemsWithDetails = order.items.map((item) => {
    const product = productsCatalog.find((p) => p.id === item.productId)
    return {
      ...item,
      name: product?.name || item.productId,
      price: product?.price || 0,
    }
  })

  // Розраховуємо загальну суму
  const calculatedTotal = itemsWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

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
        .join(', ')
    : ''

  const paymentText = order.paymentMethod === 'cod' 
    ? '💳 Накладений платіж' 
    : '💳 Переказ на картку'

  const deliveryText = order.delivery.method === 'warehouse' 
    ? '🚚 Нова Пошта' 
    : '🚴 Кур\'єр'

  const message = `
🛍️ *Нове замовлення #${order.orderNumber}*

👤 *Клієнт:*
• Ім'я: ${order.customer.fullName}
• Телефон: ${order.customer.phone}
${order.customer.email ? `• Email: ${order.customer.email}` : ''}

📦 *Доставка:*
• Місто: ${order.delivery.city}
• Відділення: ${order.delivery.branch}
• Метод: ${deliveryText}

${paymentText}
${contactMethodText ? `📱 *Зв'язок:* ${contactMethodText}` : ''}
${order.comment ? `📝 *Коментар:* ${order.comment}` : ''}

🛒 *Товари:*
${itemsWithDetails.map((item) => `• ${item.name} × ${item.quantity} шт. = ${item.price * item.quantity} грн`).join('\n')}

💰 *Разом:* ${calculatedTotal} грн
`.trim()

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    })
    console.log('Order sent to Telegram:', order.orderNumber)
  } catch (error) {
    console.error('Failed to send order to Telegram:', error)
  }
}
