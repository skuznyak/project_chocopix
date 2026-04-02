import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import type { Product } from '@chocopix/shared'
import { App } from '@/App'
import { AppProviders } from '@/app/AppProviders'
import { createQueryClient } from '@/app/createQueryClient'
import '@/index.css'

const queryClient = createQueryClient()
const seoDataElement = document.getElementById('seo-data')
const seoData = (() => {
  if (!seoDataElement?.textContent) {
    return undefined
  }

  try {
    return JSON.parse(seoDataElement.textContent) as {
      productKey?: string
      product?: Product
      popularProducts?: Product[]
    }
  } catch {
    return undefined
  }
})()

if (seoData?.popularProducts) {
  queryClient.setQueryData(['products', { sort: 'popular' }], seoData.popularProducts as Product[])
}

if (seoData?.product && seoData.productKey) {
  queryClient.setQueryData(['product', seoData.productKey], seoData.product as Product)
}

const app = (
  <React.StrictMode>
    <AppProviders queryClient={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>
)
const container = document.getElementById('root')!

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
