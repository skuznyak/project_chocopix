import axios from 'axios'
import { normalizeOrderNotificationData, type OrderNotificationData } from './orderNotification.js'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ''

export const sendOrderToTelegram = async (order: OrderNotificationData) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured')
    return
  }

  const normalized = normalizeOrderNotificationData(order)

  const message = `
🛍️ *Нове замовлення #${normalized.orderNumber}*

👤 *Клієнт:*
• Ім'я: ${normalized.customer.fullName}
• Телефон: ${normalized.customer.phone}
${normalized.customer.email ? `• Email: ${normalized.customer.email}` : ''}

📦 *Доставка:*
${normalized.delivery.region ? `• Область: ${normalized.delivery.region}` : ''}
• Місто: ${normalized.delivery.city}
• Відділення: ${normalized.delivery.branch}
• Метод: ${normalized.deliveryText}
• Вартість доставки: ${normalized.deliveryCostText}

${normalized.paymentText}
${normalized.contactMethodText ? `📱 *Зв'язок:* ${normalized.contactMethodText}` : ''}
${normalized.comment ? `📝 *Коментар:* ${normalized.comment}` : ''}

🛒 *Товари:*
${normalized.items.map((item) => `• ${item.name} × ${item.quantity} шт. = ${item.lineTotal} грн`).join('\n')}

${normalized.promoCode ? `🎟 *Промокод:* ${normalized.promoCode}` : ''}
💸 *Знижка:* -${normalized.discount} грн
💵 *Сума товарів:* ${normalized.subtotal} грн
💰 *Фінальна сума:* ${normalized.total} грн
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
