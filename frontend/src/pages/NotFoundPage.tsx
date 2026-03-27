import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Сторінку не знайдено | ChocoPix</title>
        <meta
          name="description"
          content="Сторінку не знайдено. Поверніться на головну або відкрийте каталог какао бомбочок."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <section className="mx-auto flex min-h-[55vh] max-w-7xl flex-col items-start justify-center px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Помилка 404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-[#4c1d11] sm:text-6xl">Сторінку не знайдено</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#6f4a31]">
          Можливо, посилання застаріло або URL введено з помилкою. Перейдіть на головну або відкрийте категорію какао бомбочок.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-[16px] bg-[#8c5328] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#74411f]"
          >
            На головну
          </Link>
          <Link
            to="/cacao-bombs"
            className="rounded-[16px] border border-[#a4693f] px-6 py-3 text-sm font-semibold text-[#7a4b2c] transition hover:bg-[#f3e6d3]"
          >
            До каталогу
          </Link>
        </div>
      </section>
    </>
  )
}
