import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl } from '@/utils/seo'

const PURCHASE_STORAGE_KEY = 'chocopix-last-purchase'
const GTAG_RETRY_DELAY_MS = 400
const GTAG_MAX_RETRIES = 10

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const pageUrl = buildAbsoluteUrl('/order-success')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let retryTimeoutId: number | undefined

    const trySendPurchase = (attempt = 0) => {
      const rawPurchase = window.sessionStorage.getItem(PURCHASE_STORAGE_KEY)

      if (!rawPurchase) {
        return
      }

      try {
        const purchase = JSON.parse(rawPurchase) as {
          orderNumber?: string
          total?: number
          currency?: string
        }
        const purchaseSentKey = purchase.orderNumber ? `purchase_sent:${purchase.orderNumber}` : null

        if (!orderNumber) {
          return
        }

        if (!purchase.orderNumber) {
          return
        }

        if (purchase.orderNumber !== orderNumber) {
          return
        }

        if (purchaseSentKey && window.sessionStorage.getItem(purchaseSentKey)) {
          return
        }

        if (typeof window.gtag !== 'function') {
          if (attempt >= GTAG_MAX_RETRIES) {
            return
          }

          retryTimeoutId = window.setTimeout(() => {
            trySendPurchase(attempt + 1)
          }, GTAG_RETRY_DELAY_MS)
          return
        }

        window.gtag('event', 'purchase', {
          transaction_id: purchase.orderNumber,
          value: purchase.total ?? 0,
          currency: purchase.currency ?? 'UAH',
        })

        if (purchaseSentKey) {
          window.sessionStorage.setItem(purchaseSentKey, 'true')
        }
        window.sessionStorage.removeItem(PURCHASE_STORAGE_KEY)
      } catch (error) {
        void error
        window.sessionStorage.removeItem(PURCHASE_STORAGE_KEY)
      }
    }

    trySendPurchase()

    return () => {
      if (retryTimeoutId) {
        window.clearTimeout(retryTimeoutId)
      }
    }
  }, [orderNumber])

  return (
    <>
      <Helmet>
        <title>Замовлення підтверджено | ChocoPix</title>
        <meta
          name="description"
          content="Дякуємо за замовлення в ChocoPix. Ваше замовлення прийнято, ми зв'яжемося з вами для підтвердження деталей доставки та оплати."
        />
        <meta property="og:title" content="Замовлення підтверджено | ChocoPix" />
        <meta
          property="og:description"
          content="Дякуємо за замовлення в ChocoPix. Ваше замовлення прийнято, ми зв'яжемося з вами для підтвердження деталей доставки та оплати."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 className="h-20 w-20 text-emerald-500" />
        </motion.div>
        <h1 className="mt-6 font-display text-5xl">Дякуємо за замовлення!</h1>
        <p className="mt-4 max-w-xl text-cocoa-900/70">
          Ми звʼяжемося з вами найближчим часом, щоб підтвердити деталі доставки та оплати.
        </p>
        {orderNumber ? <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Номер замовлення: {orderNumber}</p> : null}
        <Link to="/" className="mt-8">
          <Button>На головну</Button>
        </Link>
      </div>
    </>
  )
}
