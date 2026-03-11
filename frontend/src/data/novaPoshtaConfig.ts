// Default sender city reference (Kyiv)
// This should be updated to your actual city where you ship from
export const DEFAULT_SENDER_CITY_REF = '8d5a92a0-34c3-11db-8d82-001a92567626' // Київ

// You can add other sender cities if you have multiple warehouses
export const SENDER_CITIES = {
  KYIV: '8d5a92a0-34c3-11db-8d82-001a92567626',
  LVIV: '998c94a0-34c3-11db-8d82-001a92567626',
  KHARKIV: '88a965a0-34c3-11db-8d82-001a92567626',
  ODESA: '97d5cecc-34c3-11db-8d82-001a92567626',
  DNIPRO: '8a7858a0-34c3-11db-8d82-001a92567626',
} as const

export type SenderCityKey = keyof typeof SENDER_CITIES
