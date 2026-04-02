import { Helmet } from 'react-helmet-async'
import { STORE_NAME } from '@/content/storeInfo'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl } from '@/utils/seo'

export default function RefundPage() {
  const pageUrl = buildAbsoluteUrl('/refund')

  return (
    <>
      <Helmet>
        <title>Повернення | {STORE_NAME}</title>
        <meta
          name="description"
          content="Інформація про повернення та вирішення питань із замовленням у ChocoPix."
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`Повернення | ${STORE_NAME}`} />
        <meta
          property="og:description"
          content="Як звернутися до ChocoPix, якщо з посилкою або замовленням виникла проблема."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">Повернення</h1>
        <div className="mt-6 space-y-6 text-[17px] leading-8 text-[#5f3925]">
          <p>
            Якщо під час отримання замовлення ви помітили пошкодження упаковки, невідповідність вмісту або іншу проблему, будь ласка, зв&apos;яжіться з нами якнайшвидше через сторінку контактів.
          </p>
          <p>
            Ми розглядаємо кожне звернення окремо і намагаємося знайти зрозуміле рішення: уточнення замовлення, заміну товару або інший погоджений варіант.
          </p>
          <p>
            Для швидкого розгляду звернення корисно одразу вказати номер замовлення, короткий опис ситуації та, за можливості, фото посилки або товару після отримання.
          </p>
          <p>
            Якщо у вас є сумніви щодо стану посилки під час вручення, перевірте її одразу у відділенні або при отриманні від кур&apos;єра.
          </p>
        </div>
      </section>
    </>
  )
}
