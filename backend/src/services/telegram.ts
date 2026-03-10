const TELEGRAM_API_URL = 'https://api.telegram.org'

const escapeTelegramHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

export interface TelegramCallbackPayload {
  name: string
  phone: string
  comment?: string
}

export const sendCallbackToTelegram = async (payload: TelegramCallbackPayload) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not configured')
  }

  if (!chatId) {
    throw new Error('TELEGRAM_CHAT_ID is not configured')
  }

  const text = [
    '<b>Нова заявка: Передзвоніть мені</b>',
    '',
    `<b>Імʼя:</b> ${escapeTelegramHtml(payload.name)}`,
    `<b>Телефон:</b> ${escapeTelegramHtml(payload.phone)}`,
    `<b>Коментар:</b> ${escapeTelegramHtml(payload.comment?.trim() || '—')}`,
  ].join('\n')

  const response = await fetch(`${TELEGRAM_API_URL}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram API request failed: ${response.status} ${body}`)
  }
}
