import { useState } from 'react'
import { Phone, ShoppingBag, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CallbackModal } from '@/components/layout/CallbackModal'
import { useCartStore } from '@/store/cartStore'

const navItems = [
  { label: 'Головна', to: '/' },
  { label: 'Бомбочки', to: '/cacao-bombs' },
  { label: 'Набори', to: '/gift-sets' },
  { label: 'Акції', to: '/promotions', isPromo: true },
  { label: 'Контакти', to: '/contacts' },
]

export const Header = () => {
  const itemsCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))
  const openCart = useCartStore((state) => state.openCart)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#eadfcb]/80 bg-[#f4eddc]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="group flex items-center gap-3 text-cocoa-900"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/favicon.svg"
              alt="ChocoPix"
              loading="eager"
              decoding="async"
              className="h-12 w-12 rounded-full object-contain transition duration-300 group-hover:scale-110"
            />
            <span className="text-[26px] font-extrabold tracking-[-0.05em]">
              <span className="text-[#4c1d11]">Choco</span>
              <span className="text-[#d29b60]">Pix</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={item.to === '/' ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : undefined}
                className={`relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                  item.isPromo
                    ? 'text-[#b42318] hover:text-[#911e13] after:bg-[#b42318]'
                    : 'text-cocoa-900/72 hover:text-cocoa-900 after:bg-[#a4693f]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsCallbackOpen(true)}
              className="hidden min-h-11 items-center gap-2 rounded-full border border-[#a4693f] px-5 text-sm font-semibold text-cocoa-900 transition hover:bg-[#fbf5ea] lg:inline-flex"
            >
              <Phone size={16} />
              Передзвоніть мені
            </button>
            <button
              type="button"
              onClick={openCart}
              data-cart-trigger="true"
              className="relative rounded-2xl p-3 text-cocoa-900 transition duration-300 hover:-translate-y-0.5 hover:bg-[#fbf5ea] hover:shadow-[0_14px_30px_rgba(91,28,2,0.12)]"
              aria-label="Відкрити кошик"
            >
              <ShoppingBag size={24} strokeWidth={2.1} className="transition duration-300 hover:scale-110" />
              {itemsCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d28c4e] px-1 text-[10px] font-bold text-white">
                  {itemsCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-2xl p-3 text-cocoa-900 transition hover:bg-[#fbf5ea] md:hidden"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="border-t border-[#eadfcb]/80 bg-[#f4eddc] px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-[#fbf5ea] ${
                    item.isPromo ? 'text-[#b42318] hover:text-[#911e13]' : 'text-cocoa-900/72 hover:text-cocoa-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsCallbackOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-[#a4693f] px-4 py-3 text-sm font-semibold text-cocoa-900 transition hover:bg-[#fbf5ea]"
              >
                <Phone size={16} />
                Передзвоніть мені
              </button>
            </nav>
          </div>
        )}
      </header>
      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  )
}
