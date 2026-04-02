import { Helmet } from 'react-helmet-async'
import { STORE_NAME } from '@/content/storeInfo'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl } from '@/utils/seo'

export default function PrivacyPolicyPage() {
  const pageUrl = buildAbsoluteUrl('/privacy-policy')

  return (
    <>
      <Helmet>
        <title>Політика конфіденційності | {STORE_NAME}</title>
        <meta
          name="description"
          content="Політика конфіденційності ChocoPix: як ми обробляємо контактні дані покупців під час замовлення, доставки та зворотного зв'язку."
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`Політика конфіденційності | ${STORE_NAME}`} />
        <meta
          property="og:description"
          content="Як ChocoPix використовує дані покупців для оформлення замовлень, доставки та зв'язку щодо покупки."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">Політика конфіденційності</h1>
        <div className="mt-6 space-y-6 text-[17px] leading-8 text-[#5f3925]">
          <p>
            Ми збираємо лише ті дані, які потрібні для обробки замовлення, організації доставки та зворотного зв&apos;язку з покупцем.
          </p>
          <p>
            Під час оформлення замовлення або заявки на дзвінок ви можете залишити ім&apos;я, номер телефону, email, дані доставки та коментар до замовлення.
          </p>
          <p>
            Ці дані використовуються тільки для підтвердження покупки, передачі замовлення в службу доставки, уточнення деталей оплати та повідомлень щодо вашого замовлення.
          </p>
          <p>
            Ми не публікуємо особисті дані покупців у відкритому доступі та не продаємо їх третім особам. Дані можуть передаватися лише сервісам, які потрібні для виконання замовлення, наприклад службі доставки або сервісу повідомлень.
          </p>
          <p>
            Якщо ви хочете уточнити, які саме дані були передані під час оформлення замовлення, або попросити видалити контактну інформацію після виконання замовлення, напишіть нам через сторінку контактів.
          </p>
        </div>
      </section>
    </>
  )
}
