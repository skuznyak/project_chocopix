import { Helmet } from 'react-helmet-async'
import { STORE_COUNTRY, STORE_NAME } from '@/content/storeInfo'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl } from '@/utils/seo'

export default function DeliveryPage() {
  const pageUrl = buildAbsoluteUrl('/delivery')

  return (
    <>
      <Helmet>
        <title>Доставка і оплата | {STORE_NAME}</title>
        <meta
          name="description"
          content="Доставка і оплата в ChocoPix: відправлення по Україні, підтвердження замовлення, умови доставки та доступні способи оплати."
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`Доставка і оплата | ${STORE_NAME}`} />
        <meta
          property="og:description"
          content="Інформація про відправлення замовлень ChocoPix по Україні, терміни обробки та способи оплати."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">Доставка і оплата</h1>
        <div className="mt-6 space-y-6 text-[17px] leading-8 text-[#5f3925]">
          <p>
            Ми надсилаємо замовлення по Україні. Після оформлення замовлення зв&apos;язуємося з покупцем, щоб підтвердити склад, спосіб оплати та деталі доставки.
          </p>
          <p>
            Доставка здійснюється службою, яка доступна під час оформлення замовлення на сайті. Вартість доставки залежить від тарифів перевізника та параметрів відправлення.
          </p>
          <p>
            Якщо товар є в наявності, ми намагаємося передати замовлення на відправлення якнайшвидше. Для індивідуальних або великих замовлень термін може бути узгоджений окремо під час підтвердження.
          </p>
          <p>
            Доступні способи оплати відображаються під час оформлення замовлення. Якщо у вас є питання щодо оплати або доставки, можна звернутися до нас до оплати замовлення.
          </p>
        </div>
      </section>
    </>
  )
}
