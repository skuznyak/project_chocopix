export interface ContactLinksConfig {
  telegramUsername: string
  viberChatUri: string
}

export const contactLinks: ContactLinksConfig = {
  telegramUsername: 'USERNAME',
  viberChatUri: 'YOUR_VIBER_URI',
}

const normalizeTelegramUsername = (username: string) => username.trim().replace(/^@/, '')

export const telegramLink = `https://t.me/${normalizeTelegramUsername(contactLinks.telegramUsername)}`
export const viberLink = `viber://pa?chatURI=${encodeURIComponent(contactLinks.viberChatUri.trim())}`
