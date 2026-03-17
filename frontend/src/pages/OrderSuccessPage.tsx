import { Helmet } from 'react-helmet-async'
import { CheckCircle2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')

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
        <meta property="og:url" content="https://chocopix.store/order-success" />
        <meta property="og:image" content="https://chocopix.store/images/107270_001.webp" />
        <link rel="canonical" href="https://chocopix.store/order-success" />
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
