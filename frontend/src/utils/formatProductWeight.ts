import type { Product } from '@chocopix/shared'

export const formatProductWeight = (product: Product) => {
  if (product.tags.includes('бомбочки')) {
    return '~30 г'
  }

  if (product.category === 'gift-set') {
    return `~${product.weight} г`
  }

  return `${product.weight} г`
}
