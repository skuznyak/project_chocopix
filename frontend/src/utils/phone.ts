export const normalizePhone = (value: string) => value.replace(/[^\d+]/g, '')

export const formatPhonePreview = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 12)
  const normalized = digits.startsWith('38') ? digits : `38${digits}`

  const country = normalized.slice(0, 2)
  const operator = normalized.slice(2, 5)
  const part1 = normalized.slice(5, 8)
  const part2 = normalized.slice(8, 10)
  const part3 = normalized.slice(10, 12)

  return `+${country} (${operator}) ${part1}-${part2}-${part3}`.trim()
}
