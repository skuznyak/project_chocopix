import nodemailer from 'nodemailer'
import { normalizeOrderNotificationData, type OrderNotificationData } from './orderNotification.js'

export const sendOrderToEmail = async (order: OrderNotificationData, recipientEmails: string[]) => {
  const smtpUser = process.env.EMAIL_USER
  const smtpPass = process.env.EMAIL_APP_PASSWORD
  const hasPlaceholderCredentials = smtpUser === 'your_gmail@gmail.com' || smtpPass === 'your_16_char_app_password'

  if (!smtpUser || !smtpPass || hasPlaceholderCredentials) {
    console.warn('SMTP credentials are missing or use placeholder values. Skipping email notification.')
    return
  }

  if (!recipientEmails.length) {
    return
  }

  const normalized = normalizeOrderNotificationData(order)

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
      <h1>🛍️ Нове замовлення #${normalized.orderNumber}</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">👤 Клієнт</div>
        <div class="item">
          <strong>Ім'я:</strong> ${normalized.customer.fullName}<br>
          <strong>Телефон:</strong> ${normalized.customer.phone}<br>
          ${normalized.customer.email ? `<strong>Email:</strong> ${normalized.customer.email}<br>` : ''}
        </div>
      </div>

      <div class="section">
        <div class="section-title">📦 Доставка</div>
        <div class="item">
          ${normalized.delivery.region ? `<strong>Область:</strong> ${normalized.delivery.region}<br>` : ''}
          <strong>Місто:</strong> ${normalized.delivery.city}<br>
          <strong>Відділення:</strong> ${normalized.delivery.branch}<br>
          <strong>Метод:</strong> ${normalized.deliveryText}<br>
          <strong>Вартість доставки:</strong> ${normalized.deliveryCostText}
        </div>
      </div>

      <div class="section">
        <div class="section-title">💳 Оплата</div>
        <div class="item">${normalized.paymentText}</div>
        ${normalized.contactMethodText ? `<div class="item"><strong>📱 Зв'язок:</strong> ${normalized.contactMethodText}</div>` : ''}
        ${normalized.comment ? `<div class="item"><strong>📝 Коментар:</strong> ${normalized.comment}</div>` : ''}
      </div>

      <div class="section">
        <div class="section-title">🛒 Товари</div>
        ${normalized.items.map((item) => `
          <div class="item">
            <strong>${item.name}</strong><br>
            ${item.quantity} шт. × ${item.price} грн = <strong>${item.lineTotal} грн</strong>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <div class="section-title">💸 Підсумок</div>
        ${normalized.promoCode ? `<div class="item"><strong>🎟 Промокод:</strong> ${normalized.promoCode}</div>` : ''}
        <div class="item"><strong>Знижка:</strong> -${normalized.discount} грн</div>
        <div class="item"><strong>Сума товарів:</strong> ${normalized.subtotal} грн</div>
      </div>

      <div class="total">
        💰 Фінальна сума: ${normalized.total} грн
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
