/// <reference types="vite/client" />

interface Window {
  __SEO_DATA__?: {
    productKey?: string
    product?: import('@chocopix/shared').Product
    popularProducts?: import('@chocopix/shared').Product[]
  }
}
