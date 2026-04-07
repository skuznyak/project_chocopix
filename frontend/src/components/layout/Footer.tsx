import { Link } from 'react-router-dom'
import { STORE_PHONE_DISPLAY, STORE_SITE_HOST } from '@/content/storeInfo'

export const Footer = () => (
  <footer id="footer" className="mt-16 border-t border-[#d4d9b8] bg-[#7b4a32] text-white">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-8">
        <div className="text-left lg:max-w-sm">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="ChocoPix" loading="lazy" decoding="async" className="h-12 w-12 rounded-2xl object-contain" />
            <p className="text-3xl font-extrabold tracking-[-0.05em]">
              <span className="text-white">Choco</span>
              <span className="text-[#d9b18b]">Pix</span>
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            Авторські шоколадні бомбочки з маршмелоу для домашніх ритуалів, затишних подарунків і теплих свят.
          </p>
        </div>

        <div className="text-left lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Каталог</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link to="/cacao-bombs" className="transition hover:text-white">Шоколадні бомбочки</Link>
            <Link to="/gift-sets" className="transition hover:text-white">Подарункові набори</Link>
            <Link to="/marshmallow" className="transition hover:text-white">Маршмелоу</Link>
          </div>
        </div>

        <div className="text-left lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Контакти</p>
          <p className="mt-3 text-sm text-white/80">{STORE_PHONE_DISPLAY}</p>
          <p className="mt-2 text-sm text-white/80">
            <Link to="/" className="transition hover:text-white">{STORE_SITE_HOST}</Link>
          </p>
          <p className="mt-4 text-sm text-white/50">© 2025-2026</p>
        </div>

        <div className="text-left lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Покупцям</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link to="/privacy-policy" className="transition hover:text-white">Політика конфіденційності</Link>
            <Link to="/delivery" className="transition hover:text-white">Доставка і оплата</Link>
            <Link to="/contacts" className="transition hover:text-white">Контакти</Link>
          </div>
        </div>

        <div className="text-left lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Спосіб оплати</p>
          <div className="mt-3 flex items-center gap-3 lg:justify-center">
            <div className="flex h-11 w-[92px] items-center justify-center rounded-xl border border-white/10 bg-white/12 px-3">
              <img
                src="/visa.svg"
                alt="Visa"
                loading="lazy"
                decoding="async"
                className="h-[18px] w-auto object-contain"
              />
            </div>
            <div className="flex h-11 w-[72px] items-center justify-center rounded-xl border border-white/10 bg-white/12 px-3">
              <img
                src="/mastercard.svg"
                alt="Mastercard"
                loading="lazy"
                decoding="async"
                className="h-[22px] w-auto object-contain"
              />
            </div>
          </div>

          <p className="mt-5 text-sm text-white/70">
            Розробив{' '}
            <a
              href="https://kuznyak.dev/"
              target="_blank"
              rel="noreferrer"
              className="align-baseline text-[16px] uppercase leading-none tracking-[0.08em] transition-opacity hover:opacity-80"
              style={{ color: '#E8FF00', fontFamily: '"Bebas Neue", sans-serif' }}
            >
              KUZNYAK.DEV
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
)
