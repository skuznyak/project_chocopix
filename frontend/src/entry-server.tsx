import type { Product } from '@chocopix/shared'
import { dehydrate } from '@tanstack/react-query'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppProviders } from '@/app/AppProviders'
import { createQueryClient } from '@/app/createQueryClient'
import { AppServer } from '@/AppServer'
import { productsMock } from '@/data/products.mock'

const ROUTES_WITH_PRODUCT_LIST = new Set(['/', '/cacao-bombs', '/marshmallow', '/gift-sets', '/promotions'])
const PRODUCT_ROUTE_PREFIX = '/product/'

const sortProductsByPopularity = (products: Product[]) => [...products].sort((left, right) => right.popularity - left.popularity)
const sortedProducts = sortProductsByPopularity(productsMock)

const extractProductSlug = (url: string) => {
  if (!url.startsWith(PRODUCT_ROUTE_PREFIX)) {
    return null
  }

  return url.slice(PRODUCT_ROUTE_PREFIX.length) || null
}

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

export const renderRoute = async (url: string) => {
  const queryClient = createQueryClient()

  if (ROUTES_WITH_PRODUCT_LIST.has(url)) {
    queryClient.setQueryData(['products', { sort: 'popular' }], sortedProducts)
  }

  const productSlug = extractProductSlug(url)

  if (productSlug) {
    const product = productsMock.find((item) => item.slug === productSlug || item.id === productSlug)

    if (product) {
      queryClient.setQueryData(['product', productSlug], product)
      queryClient.setQueryData(['products', { sort: 'popular' }], sortedProducts)
    }
  }

  const helmetContext: { helmet?: HelmetData } = {}
  const appHtml = renderToString(
    <AppProviders
      helmetContext={helmetContext}
      queryClient={queryClient}
      dehydratedState={dehydrate(queryClient)}
    >
      <StaticRouter location={url}>
        <AppServer />
      </StaticRouter>
    </AppProviders>,
  )

  return {
    appHtml,
    headMarkup: helmetContext.helmet ? buildHeadMarkup(helmetContext.helmet) : '',
    dehydratedState: dehydrate(queryClient),
  }
}
