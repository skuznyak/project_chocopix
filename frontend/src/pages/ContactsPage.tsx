import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function ContactsPage() {
  return (
    <>
      <Helmet>
        <title>Контакти ChocoPix | Замовити какао бомбочки</title>
        <meta
          name="description"
          content="Контакти ChocoPix: телефон, месенджери та консультація щодо замовлення какао бомбочок з маршмелоу. Швидко відповідаємо по Україні."
        />
        <meta property="og:title" content="Контакти ChocoPix | Замовити какао бомбочки" />
        <meta
          property="og:description"
          content="Контакти ChocoPix: телефон, месенджери та консультація щодо замовлення какао бомбочок з маршмелоу. Швидко відповідаємо по Україні."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chocopix.store/contacts" />
        <meta property="og:image" content="https://chocopix.store/favicon.svg" />
        <link rel="canonical" href="https://chocopix.store/contacts" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Контакти</h1>
        <p className="mt-4 max-w-3xl text-[17px] leading-8 text-[#6f4a31]">
          Якщо потрібна допомога з вибором смаку, набору або доставкою, зв&apos;яжіться з нами будь-яким зручним способом.
        </p>

        <div className="mt-8 grid gap-4 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 text-[#5f3925] sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Телефон</p>
            <p className="mt-2 text-lg font-semibold">+38 (066) 138-97-81</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Сайт</p>
            <p className="mt-2 text-lg font-semibold">chocopix.store</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">WhatsApp</p>
            <a className="mt-2 inline-block text-lg font-semibold underline underline-offset-4" href="https://wa.me/380661389781">
              Написати у WhatsApp
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8c5328]">Viber</p>
            <a className="mt-2 inline-block text-lg font-semibold underline underline-offset-4" href="viber://chat?number=%2B380661389781">
              Написати у Viber
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4] p-5 text-[#5f3925]">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#4c1d11]">Як оформити замовлення</h2>
            <p className="mt-2 text-sm leading-6">
              Допоможемо обрати формат: окремі <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">какао бомбочки</Link>{' '}
              або <Link to="/gift-sets" className="font-semibold underline underline-offset-4">подарункові набори</Link>.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4] p-5 text-[#5f3925]">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#4c1d11]">Швидкість відповіді</h2>
            <p className="mt-2 text-sm leading-6">
              Відповідаємо в месенджерах і телефоном у робочий час, щоб ви могли швидко уточнити наявність і доставку.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4] p-5 text-[#5f3925]">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#4c1d11]">Доставка і комунікація</h2>
            <p className="mt-2 text-sm leading-6">
              Підтверджуємо деталі замовлення перед відправкою та супроводжуємо вас до отримання посилки.
            </p>
          </article>
        </div>
      </div>
    </>
  )
}
