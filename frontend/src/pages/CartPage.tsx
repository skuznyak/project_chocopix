import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl } from '@/utils/seo'

export default function CartPage() {
  const pageUrl = buildAbsoluteUrl('/cart')

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
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#4c1d11] sm:text-5xl">Кошик</h1>
        <p className="mt-4 text-lg leading-8 text-[#6f4a31]">
          Кошик ChocoPix відкривається у бічній панелі. Поверніться до каталогу, щоб додати товари, або переходьте до оформлення замовлення.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/cacao-bombs"
            className="rounded-[16px] bg-[#8c5328] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#74411f]"
          >
            До каталогу
          </Link>
          <Link
            to="/checkout"
            className="rounded-[16px] border border-[#a4693f] px-6 py-3 text-sm font-semibold text-[#7a4b2c] transition hover:bg-[#f3e6d3]"
          >
            До оформлення
          </Link>
        </div>
      </section>
    </>
  )
}
