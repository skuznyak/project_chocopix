import { productsCatalog } from '../shared/dist/catalog/products.js'

const STATIC_PRERENDER_ROUTES = ['/', '/404', '/cart', '/checkout', '/order-success', '/cacao-bombs', '/marshmallow', '/gift-sets', '/contacts', '/privacy-policy', '/delivery', '/refund']
const PRODUCT_PRERENDER_ROUTES = productsCatalog.map((product) => `/product/${product.slug ?? product.id}`)

export const PRERENDER_ROUTES = [...STATIC_PRERENDER_ROUTES, ...PRODUCT_PRERENDER_ROUTES]
