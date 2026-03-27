import { Helmet } from 'react-helmet-async'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CupsPage() {
  return (
    <>
      <Helmet>
        <title>Чашки для какао - ChocoPix</title>
        <meta
          name="description"
          content="Стильні чашки для какао-бомбочок. Ідеальне доповнення до ваших улюблених бомбочок."
        />
        <meta property="og:title" content="Чашки для какао - ChocoPix" />
        <meta
          property="og:description"
          content="Стильні чашки для какао-бомбочок. Ідеальне доповнення до ваших улюблених бомбочок."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chocopix.store/cups" />
        <meta property="og:image" content="https://chocopix.store/images/107270_001.webp" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://chocopix.store/cups" />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#6b4331] transition hover:text-[#8c5328]"
          >
            <ArrowLeft size={18} />
            Повернутись на головну
          </Link>
        </div>
        <div className="text-center">
          <h1 className="font-display text-6xl font-semibold tracking-[-0.04em] text-[#4c1d11]">
            Чашки для какао
          </h1>
          <p className="mt-4 text-lg text-[#8a5d3c]">
            Найкращі чашки для ваших улюблених какао-бомбочок
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Чашка 1 */}
          <article className="group flex flex-col overflow-hidden rounded-[34px] border border-[#eadfcb] bg-[#f8f1e4] shadow-[0_18px_40px_rgba(92,55,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(92,55,28,0.1)]">
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80"
                alt="Класична біла чашка"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-[#4c1d11]">
                Класична біла
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#7c5338]">
                Ідеальна чашка для спостереження за тим, як розчиняється бомбочка
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-lg font-semibold">299 грн</span>
              </div>
            </div>
          </article>

          {/* Чашка 2 */}
          <article className="group flex flex-col overflow-hidden rounded-[34px] border border-[#eadfcb] bg-[#f8f1e4] shadow-[0_18px_40px_rgba(92,55,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(92,55,28,0.1)]">
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80"
                alt="Прозора скляна чашка"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-[#4c1d11]">
                Прозора скляна
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#7c5338]">
                Щоб бачити кожен момент магії розчинення бомбочки
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-lg font-semibold">349 грн</span>
              </div>
            </div>
          </article>

          {/* Чашка 3 */}
          <article className="group flex flex-col overflow-hidden rounded-[34px] border border-[#eadfcb] bg-[#f8f1e4] shadow-[0_18px_40px_rgba(92,55,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(92,55,28,0.1)]">
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=600&q=80"
                alt="Чашка з мармуровим ефектом"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-[#4c1d11]">
                Мармурова
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#7c5338]">
                Стильний дизайн з унікальним візерунком
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-lg font-semibold">399 грн</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
