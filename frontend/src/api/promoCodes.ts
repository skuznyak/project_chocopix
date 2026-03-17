import { apiClient, USE_MOCK } from '@/api/client'

interface PromoCodeValidationResponse {
  isValid: boolean
  discount?: number
  error?: string
  data?: {
    type: 'percent' | 'fixed'
    value: number
    expires: string
  }
}

export const validatePromoCode = async (code: string, subtotal: number): Promise<PromoCodeValidationResponse> => {
  if (!USE_MOCK) {
    try {
      const response = await apiClient.post<PromoCodeValidationResponse>(
        '/promo/validate',
        { code, subtotal },
        { timeout: 1200 },
      )
      return response.data
    } catch {
      return {
        isValid: false,
        error: 'Сервіс промокодів тимчасово недоступний. Спробуйте ще раз.',
      }
    }
  }

  // Mock validation for development
  const mockCodes: Record<string, { type: 'percent' | 'fixed'; value: number; expires: string }> = {
    CHOCO10: { type: 'percent', value: 10, expires: '2026-04-01' },
    CHOCO50: { type: 'fixed', value: 50, expires: '2026-05-01' },
    CHOCO20: { type: 'percent', value: 20, expires: '2026-06-01' },
  }

  const normalizedCode = code.trim().toUpperCase()
  const promoCode = mockCodes[normalizedCode]

  if (!promoCode || !normalizedCode.startsWith('CHOCO')) {
    return {
      isValid: false,
      error: 'Промокод недійсний або термін його дії закінчився',
    }
  }

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

  let discount = 0
  if (promoCode.type === 'percent') {
    discount = Math.round((subtotal * promoCode.value) / 100)
  } else if (promoCode.type === 'fixed') {
    discount = Math.min(promoCode.value, subtotal)
  }

  return {
    isValid: true,
    discount,
    data: promoCode,
  }
}
