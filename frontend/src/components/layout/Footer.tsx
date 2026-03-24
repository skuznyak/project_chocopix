import { Link } from 'react-router-dom'

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
            <Link to="/promotions" className="transition hover:text-white">Акції</Link>
            <Link to="/contacts" className="transition hover:text-white">Контакти</Link>
          </div>
        </div>

        <div className="text-left lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Контакти</p>
          <p className="mt-3 text-sm text-white/80">+38 (066)138-97-81</p>
          <p className="mt-2 text-sm text-white/80">
            <a href="/" className="transition hover:text-white">chocopix.store</a>
          </p>
          <p className="mt-4 text-sm text-white/50">© 2025-2026</p>
        </div>

        <div className="text-left lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Месенджери</p>
          <div className="mt-3 flex gap-3 lg:justify-center">
            <a
              href="https://wa.me/380661389781"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-white transition-transform hover:scale-110 hover:bg-green-500/30"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
              </svg>
            </a>
            <a
              href="viber://chat?number=%2B380661389781"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-white transition-transform hover:scale-110 hover:bg-purple-500/30"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.176 13.576c-.258-.119-3.029-1.374-3.502-1.545-.473-.172-.817-.261-1.162.259-.345.52-1.337 1.688-1.637 2.03-.3.343-.6.387-1.075.15-.474-.237-1.996-.735-3.792-2.334-1.4-1.248-2.346-2.79-2.622-3.263-.276-.473-.03-.725.213-.966.215-.214.478-.556.714-.837.237-.28.315-.472.472-.788.157-.315.079-.588-.039-.825-.118-.237-1.162-2.802-1.596-3.844-.424-1.019-.854-.88-1.162-.896-.295-.015-.632-.017-.969-.017s-.882.126-1.344.632c-.462.504-1.764 1.727-1.764 4.215 0 2.488 1.813 4.888 2.07 5.23.256.343 3.57 5.46 8.632 7.642 1.206.521 2.144.831 2.874 1.064 1.211.386 2.315.33 3.187.199.977-.148 3.015-1.232 3.448-2.43.433-1.197.433-2.221.305-2.43-.128-.208-.434-.33-.906-.566z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="text-left lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Спосіб оплати</p>
          <div className="mt-3 flex gap-2 lg:justify-center">
            <div className="flex h-10 items-center justify-center rounded-lg bg-white/10 px-4">
              <span className="text-base font-bold text-white">Visa</span>
            </div>
            <div className="flex h-10 items-center justify-center rounded-lg bg-white/10 px-4">
              <span className="text-base font-bold text-white">MasterCard</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/80">
            розробив{' '}
            <a
              href="https://kuznyak.dev/"
              target="_blank"
              rel="noreferrer"
              className="text-xl leading-none transition hover:opacity-80"
              style={{ color: 'rgb(232, 255, 0)', fontFamily: '"Bebas Neue", sans-serif' }}
            >
              KUZNYAK.DEV
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
)
