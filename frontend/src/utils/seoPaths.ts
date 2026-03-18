export const SITE_URL = 'https://chocopix.store'
export const CATEGORY_PATH = '/kakao-bombochky'
export const LEGACY_CATEGORY_PATH = '/cacao-bombs'
const PRODUCT_PREFIX = 'kakao-bombochka-'

export const buildAbsoluteUrl = (path: string) => {
  if (path === '/') {
    return `${SITE_URL}/`
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const buildProductPath = (slugOrId: string) => `/kakao-bombochka-${slugOrId}`

export const extractProductLookupKey = (value: string) =>
  value.startsWith(PRODUCT_PREFIX) ? value.slice(PRODUCT_PREFIX.length) : value
