import type { Product } from '@chocopix/shared'

type MetaPixelPurchasePayload = {
  total?: number
  currency?: string
}

export const trackMetaAddToCart = (product: Pick<Product, 'name' | 'price'>) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return
  }

  window.fbq('track', 'AddToCart', {
    content_name: product.name,
    value: Number(product.price) || 0,
    currency: 'UAH',
  })
}

export const trackMetaPurchase = (order: MetaPixelPurchasePayload) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return
  }

  window.fbq('track', 'Purchase', {
    value: Number(order.total) || 0,
    currency: order.currency || 'UAH',
  })
}
