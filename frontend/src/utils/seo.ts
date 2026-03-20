export const SITE_URL = 'https://chocopix.store'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/107270_001.webp`
const UTILITY_ROUTES = new Set(['/cart', '/checkout', '/order-success', '/404'])

export const buildAbsoluteUrl = (path: string) => {
  if (path === '/') {
    return `${SITE_URL}/`
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const toAbsoluteImageUrl = (src?: string) => {
  if (!src) {
    return DEFAULT_OG_IMAGE
  }

  return src.startsWith('http') ? src : `${SITE_URL}${src.startsWith('/') ? src : `/${src}`}`
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ChocoPix',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  description: 'Шоколадні бомбочки та какао бомбочки з маршмелоу ручної роботи з доставкою по Україні.',
  telephone: '+380661389781',
  areaServed: 'UA',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+380661389781',
      contactType: 'customer support',
      areaServed: 'UA',
      availableLanguage: ['uk'],
    },
  ],
  sameAs: ['https://wa.me/380661389781'],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ChocoPix',
  url: `${SITE_URL}/`,
  inLanguage: 'uk-UA',
  description: 'Купити шоколадні бомбочки та какао бомбочки з маршмелоу з доставкою по Україні.',
}

export const buildBreadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: buildAbsoluteUrl(item.path),
  })),
})

export const shouldIncludeSitewideSchemas = (pathname: string) => !UTILITY_ROUTES.has(pathname)
