import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { STORE_COUNTRY, STORE_EMAIL, STORE_NAME, STORE_PHONE_DISPLAY, STORE_PHONE_LINK, STORE_SITE_HOST, STORE_WHATSAPP_URL } from '@/content/storeInfo'

export default function ContactsPage() {
  return (
    <>
      <Helmet>
        <title>Контакти {STORE_NAME} | Замовити какао бомбочки та маршмелоу</title>
        <meta
          name="description"
          content="Контакти ChocoPix: телефон і месенджери для замовлення какао бомбочок, подарункових наборів і маршмелоу. Консультація та доставка по Україні."
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`Контакти ${STORE_NAME} | Замовити какао бомбочки та маршмелоу`} />
        <meta
          property="og:description"
          content="Контакти ChocoPix: телефон і месенджери для замовлення какао бомбочок, подарункових наборів і маршмелоу. Консультація та доставка по Україні."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chocopix.store/contacts" />
        <meta property="og:image" content="https://chocopix.store/favicon.svg" />
        <link rel="canonical" href="https://chocopix.store/contacts" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">Контакти</h1>
        <p className="mt-4 max-w-3xl text-[17px] leading-8 text-[#3D2616]">
          Якщо потрібна допомога з вибором смаку, набору або доставкою, зв&apos;яжіться з нами будь-яким зручним способом.
        </p>

        <div className="mt-8 grid gap-4 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 text-[#5f3925] sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Телефон</p>
            <a className="mt-2 inline-block text-lg font-semibold underline underline-offset-4" href={`tel:${STORE_PHONE_LINK}`}>
              {STORE_PHONE_DISPLAY}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Сайт</p>
            <p className="mt-2 text-lg font-semibold">{STORE_SITE_HOST}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">WhatsApp</p>
            <a className="mt-2 inline-block text-lg font-semibold underline underline-offset-4" href={STORE_WHATSAPP_URL}>
              Написати у WhatsApp
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Viber</p>
            <a className="mt-2 inline-block text-lg font-semibold underline underline-offset-4" href={`tel:${STORE_PHONE_LINK}`}>
              Зателефонувати / Viber
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Email</p>
            <a className="mt-2 inline-block text-lg font-semibold underline underline-offset-4" href={`mailto:${STORE_EMAIL}`}>
              {STORE_EMAIL}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Країна</p>
            <p className="mt-2 text-lg font-semibold">{STORE_COUNTRY}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4] p-5 text-[#5f3925]">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#3D2616]">Як замовити какао бомбочки та набори</h2>
            <p className="mt-2 text-sm leading-6">
              Допоможемо обрати формат: окремі <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">какао бомбочки</Link>{' '}
              або <Link to="/gift-sets" className="font-semibold underline underline-offset-4">подарункові набори</Link>.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4] p-5 text-[#5f3925]">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#3D2616]">Швидкий зв'язок для замовлення</h2>
            <p className="mt-2 text-sm leading-6">
              Відповідаємо в месенджерах і телефоном у робочий час, щоб ви могли швидко уточнити наявність і доставку.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4] p-5 text-[#5f3925]">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#3D2616]">Доставка по Україні та супровід замовлення</h2>
            <p className="mt-2 text-sm leading-6">
              Підтверджуємо деталі замовлення перед відправкою та супроводжуємо вас до отримання посилки.
            </p>
          </article>
        </div>
      </div>
    </>
  )
}
