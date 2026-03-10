export const Footer = () => (
  <footer className="mt-16 border-t border-[#d4d9b8] bg-[#643721] text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div>
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="ChocoPix" className="h-12 w-12 rounded-2xl bg-white/10 p-1 object-contain" />
          <p className="text-3xl font-extrabold tracking-[-0.05em]">
            <span className="text-white">Choco</span>
            <span className="text-[#d9b18b]">Pix</span>
          </p>
        </div>
        <p className="mt-3 max-w-sm text-sm text-white/70">
          Авторські шоколадні бомбочки з маршмелоу для домашніх ритуалів, затишних подарунків і теплих свят.
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Контакти</p>
        <p className="mt-3 text-sm text-white/80">+38 (097) 123-45-67</p>
        <p className="mt-2 text-sm text-white/80">hello@chocopix.store</p>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Соцмережі</p>
        <div className="mt-3 flex gap-4 text-sm text-white/80">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>
    </div>
  </footer>
)
