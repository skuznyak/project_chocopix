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

type ProductSchemaInput = {
  name: string
  description: string
  url: string
  image: string[]
  sku: string
  category: string
  price: number
}

const buildPriceValidUntil = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  return date.toISOString().slice(0, 10)
}

const MERCHANT_RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'UA',
  returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
}

const OFFER_SHIPPING_DETAILS = {
  '@type': 'OfferShippingDetails',
  shippingDestination: {
    '@type': 'DefinedRegion',
    addressCountry: 'UA',
  },
  shippingRate: {
    '@type': 'MonetaryAmount',
    value: 0,
    currency: 'UAH',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: {
      '@type': 'QuantitativeValue',
      minValue: 0,
      maxValue: 1,
      unitCode: 'DAY',
    },
    transitTime: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 3,
      unitCode: 'DAY',
    },
  },
}

export const buildProductSchema = ({ name, description, url, image, sku, category, price }: ProductSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  url,
  image,
  sku,
  category,
  inLanguage: 'uk-UA',
  brand: {
    '@type': 'Brand',
    name: 'ChocoPix',
  },
  offers: {
    '@type': 'Offer',
    url,
    priceCurrency: 'UAH',
    price,
    priceValidUntil: buildPriceValidUntil(),
    itemCondition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'ChocoPix',
    },
    hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
    shippingDetails: OFFER_SHIPPING_DETAILS,
  },
})

export const shouldIncludeSitewideSchemas = (pathname: string) => !UTILITY_ROUTES.has(pathname)
