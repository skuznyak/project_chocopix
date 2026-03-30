import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import type { Product } from '@chocopix/shared'
import { AppProviders } from '@/app/AppProviders'
import { createQueryClient } from '@/app/createQueryClient'
import { AppServer } from '@/AppServer'
import { getProductById, getProducts } from '@/api/products'

type HelmetData = {
  title: { toString: () => string }
  priority?: { toString: () => string }
  meta: { toString: () => string }
  link: { toString: () => string }
  script: { toString: () => string }
}

const buildHeadMarkup = (helmet: HelmetData) =>
  [
    helmet.title.toString(),
    helmet.priority?.toString() ?? '',
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('')

const PRODUCT_ROUTE_PREFIX = '/product/'
const ROUTES_WITH_PRODUCT_LIST = new Set(['/', '/cacao-bombs', '/marshmallow', '/gift-sets'])

const extractProductSlug = (url: string) => {
  if (!url.startsWith(PRODUCT_ROUTE_PREFIX)) {
    return null
  }

  return url.slice(PRODUCT_ROUTE_PREFIX.length) || null
}

type SeoHydrationData = {
  productKey?: string
  product?: Product
  popularProducts?: Product[]
}

const buildSeoHydrationData = async (url: string) => {
  const seoData: SeoHydrationData = {}

  if (ROUTES_WITH_PRODUCT_LIST.has(url)) {
    seoData.popularProducts = await getProducts({ sort: 'popular' })
  }

  const productSlug = extractProductSlug(url)

  if (!productSlug) {
    return seoData
  }

  seoData.productKey = productSlug
  seoData.product = await getProductById(productSlug)

  if (!seoData.popularProducts) {
    seoData.popularProducts = await getProducts({ sort: 'popular' })
  }

  return seoData
}

export const renderRoute = async (url: string) => {
  const queryClient = createQueryClient()
  const seoData = await buildSeoHydrationData(url)

  if (seoData.popularProducts) {
    queryClient.setQueryData(['products', { sort: 'popular' }], seoData.popularProducts)
  }

  if (seoData.product && seoData.productKey) {
    queryClient.setQueryData(['product', seoData.productKey], seoData.product)
  }

  const helmetContext: { helmet?: HelmetData } = {}
  const appHtml = renderToString(
    <AppProviders
      helmetContext={helmetContext}
      queryClient={queryClient}
    >
      <StaticRouter location={url}>
        <AppServer />
      </StaticRouter>
    </AppProviders>,
  )

  return {
    appHtml,
    headMarkup: helmetContext.helmet ? buildHeadMarkup(helmetContext.helmet) : '',
    seoData,
  }
}
