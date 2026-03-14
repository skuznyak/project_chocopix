import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROMO_CODES_PATH = path.resolve(__dirname, '../../promo-codes.json')

export interface PromoCodeData {
  type: 'percent' | 'fixed'
  value: number
  expires: string
}

export interface PromoCodeValidationResult {
  isValid: boolean
  error?: string
  discount?: number
  data?: PromoCodeData
}

let promoCodesCache: Record<string, PromoCodeData> | null = null

const loadPromoCodes = (): Record<string, PromoCodeData> => {
  if (promoCodesCache !== null) {
    return promoCodesCache
  }

  try {
    const fileContent = fs.readFileSync(PROMO_CODES_PATH, 'utf-8')
    const parsed = JSON.parse(fileContent) as Record<string, PromoCodeData>
    promoCodesCache = parsed
    return parsed
  } catch (error) {
    console.error('Failed to load promo codes:', error)
    const empty: Record<string, PromoCodeData> = {}
    promoCodesCache = empty
    return empty
  }
}

export const reloadPromoCodes = () => {
  promoCodesCache = null
  return loadPromoCodes()
}

export const validatePromoCode = (
  code: string,
  subtotal: number
): PromoCodeValidationResult => {
  const normalizedCode = code.trim().toUpperCase()
  
  // Check if code starts with CHOCO
  if (!normalizedCode.startsWith('CHOCO')) {
    return {
      isValid: false,
      error: 'Промокод недійсний або термін його дії закінчився',
    }
  }

  const promoCodes = loadPromoCodes()
  const promoCode = promoCodes[normalizedCode]

  // Check if promo code exists
  if (!promoCode) {
    return {
      isValid: false,
      error: 'Промокод недійсний або термін його дії закінчився',
    }
  }

  // Check expiration date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiresDate = new Date(promoCode.expires)
  expiresDate.setHours(0, 0, 0, 0)

  if (today > expiresDate) {
    return {
      isValid: false,
      error: 'Промокод недійсний або термін його дії закінчився',
    }
  }

  // Calculate discount
  let discount = 0
  if (promoCode.type === 'percent') {
    discount = Math.round((subtotal * promoCode.value) / 100)
  } else if (promoCode.type === 'fixed') {
    discount = Math.min(promoCode.value, subtotal)
  }

  return {
    isValid: true,
    data: promoCode,
    discount,
  }
}
