import axios from 'axios'
import { normalizeOrderNotificationData, type OrderNotificationData } from './orderNotification.js'

const escapeTelegramMarkdown = (value: string) =>
  value.replaceAll('_', '\\_')

export const sendOrderToTelegram = async (order: OrderNotificationData) => {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || ''
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || ''

  if (!telegramBotToken || !telegramChatId) {
    console.warn('Telegram credentials not configured')
    return
  }

  const normalized = normalizeOrderNotificationData(order)

  const message = `
🛍️ *Нове замовлення #${normalized.orderNumber}*

👤 *Клієнт:*
• Ім'я: ${escapeTelegramMarkdown(normalized.customer.fullName)}
• Телефон: ${escapeTelegramMarkdown(normalized.customer.phone)}
${normalized.customer.email ? `• Email: ${escapeTelegramMarkdown(normalized.customer.email)}` : ''}

📦 *Доставка:*
${normalized.delivery.region ? `• Область: ${normalized.delivery.region}` : ''}
• Місто: ${normalized.delivery.city}
• Відділення: ${normalized.delivery.branch}
• Метод: ${normalized.deliveryText}
• Вартість доставки: ${normalized.deliveryCostText}

${normalized.paymentText}
${normalized.contactMethodText ? `📱 *Зв'язок:* ${normalized.contactMethodText}` : ''}
${normalized.comment ? `📝 *Коментар:* ${escapeTelegramMarkdown(normalized.comment)}` : ''}

🛒 *Товари:*
${normalized.items
  .map((item) => `• ${escapeTelegramMarkdown(item.name)} × ${item.quantity} шт. = ${item.lineTotal} грн`)
  .join('\n')}

${normalized.promoCode ? `🎟 *Промокод:* ${escapeTelegramMarkdown(normalized.promoCode)}` : ''}
💸 *Знижка:* -${normalized.discount} грн
💵 *Сума товарів:* ${normalized.subtotal} грн
💰 *Фінальна сума:* ${normalized.total} грн
  `.trim()

  try {
    await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: telegramChatId,
      text: message,
      parse_mode: 'Markdown',
    })
    console.log('Order sent to Telegram:', order.orderNumber)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to send order to Telegram:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      })
      return
    }

    console.error('Failed to send order to Telegram:', error)
  }
}
