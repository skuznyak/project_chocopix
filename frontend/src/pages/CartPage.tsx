import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title>Кошик | ChocoPix</title>
        <meta
          name="description"
          content="Кошик ChocoPix: перевірте обрані какао бомбочки перед оформленням замовлення."
        />
        <meta property="og:title" content="Кошик | ChocoPix" />
        <meta
          property="og:description"
          content="Кошик ChocoPix: перевірте обрані какао бомбочки перед оформленням замовлення."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chocopix.store/cart" />
        <meta property="og:image" content="https://chocopix.store/images/107270_001.webp" />
        <link rel="canonical" href="https://chocopix.store/cart" />
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <Navigate to="/" replace />
    </>
  )
}
