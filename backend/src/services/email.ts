import nodemailer from 'nodemailer'
import { productsCatalog } from '@chocopix/shared'

interface OrderData {
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
}

export const sendOrderToEmail = async (order: OrderData, recipientEmails: string[]) => {
  const smtpUser = process.env.EMAIL_USER
  const smtpPass = process.env.EMAIL_APP_PASSWORD

  if (!smtpUser || !smtpPass) {
    console.warn('Gmail SMTP credentials are not configured. Skipping email notification.')
    return
  }

  if (!recipientEmails.length) {
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

  // Визначаємо вартість доставки
  const FREE_DELIVERY_THRESHOLD = 2000
  const deliveryCostText = (order.subtotal || order.total) >= FREE_DELIVERY_THRESHOLD
    ? '✅ Безкоштовна'
    : '💰 За тарифами перевізника'

  // Формуємо HTML версію листа
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #8c5328, #d29b60); color: white; padding: 25px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 25px; }
    .section { margin-bottom: 25px; }
    .section-title { color: #8c5328; font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #d29b60; padding-bottom: 5px; }
    .item { background: #f9f9f9; padding: 12px; margin: 8px 0; border-radius: 6px; border-left: 3px solid #d29b60; }
    .total { background: linear-gradient(135deg, #d29b60, #8c5328); color: white; padding: 20px; border-radius: 8px; font-size: 22px; font-weight: bold; text-align: center; margin-top: 20px; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding: 15px; background: #f5f5f5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛍️ Нове замовлення #${order.orderNumber}</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">👤 Клієнт</div>
        <div class="item">
          <strong>Ім'я:</strong> ${order.customer.fullName}<br>
          <strong>Телефон:</strong> ${order.customer.phone}<br>
          ${order.customer.email ? `<strong>Email:</strong> ${order.customer.email}<br>` : ''}
        </div>
      </div>

      <div class="section">
        <div class="section-title">📦 Доставка</div>
        <div class="item">
          ${order.delivery.region ? `<strong>Область:</strong> ${order.delivery.region}<br>` : ''}
          <strong>Місто:</strong> ${order.delivery.city}<br>
          <strong>Відділення:</strong> ${order.delivery.branch}<br>
          <strong>Метод:</strong> ${deliveryText}<br>
          <strong>Вартість доставки:</strong> ${deliveryCostText}
        </div>
      </div>

      <div class="section">
        <div class="section-title">💳 Оплата</div>
        <div class="item">${paymentText}</div>
        ${contactMethodText ? `<div class="item"><strong>📱 Зв'язок:</strong> ${contactMethodText}</div>` : ''}
        ${order.comment ? `<div class="item"><strong>📝 Коментар:</strong> ${order.comment}</div>` : ''}
      </div>

      <div class="section">
        <div class="section-title">🛒 Товари</div>
        ${itemsWithDetails.map((item) => `
          <div class="item">
            <strong>${item.name}</strong><br>
            ${item.quantity} шт. × ${item.price} грн = <strong>${item.price * item.quantity} грн</strong>
          </div>
        `).join('')}
      </div>

      <div class="total">
        💰 Разом: ${calculatedTotal} грн
      </div>

      <div class="footer">
        Час замовлення: ${new Date().toLocaleString('uk-UA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  </div>
</body>
</html>
`.trim()

  try {
    const smtpHost = process.env.SMTP_HOST ?? 'smtp.gmail.com'
    const smtpPort = Number(process.env.SMTP_PORT ?? '587')
    const smtpSecure = (process.env.SMTP_SECURE ?? 'false').toLowerCase() === 'true'
    const fromName = process.env.EMAIL_FROM_NAME ?? 'ChocoPix Shop'

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const info = await transporter.sendMail({
      from: `${fromName} <${smtpUser}>`,
      to: recipientEmails,
      subject: `🛍️ Нове замовлення #${order.orderNumber} з сайту`,
      html: emailHtml,
    })

    console.log('Order email sent successfully:', order.orderNumber, 'Message ID:', info.messageId)
  } catch (error) {
    console.error('Failed to send order email:', error)
    // Не кидаємо помилку - email є додатковим каналом
  }
}
