/// <reference types="vite/client" />

interface Window {
  gtag?: (...args: unknown[]) => void
  fbq?: {
    (...args: unknown[]): void
    callMethod?: (...args: unknown[]) => void
    queue?: unknown[]
    push?: (...args: unknown[]) => void
    loaded?: boolean
    version?: string
  }
  _fbq?: Window['fbq']
}
