import { useEffect, useState } from 'react'
import { Phone, ShoppingBag, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CallbackModal } from '@/components/layout/CallbackModal'
import { useCartStore } from '@/store/cartStore'

const navItems = [
  { label: 'Бомбочки', to: '/cacao-bombs' },
  { label: 'Набори', to: '/gift-sets' },
  { label: 'Маршмелоу', to: '/marshmallow' },
  { label: 'Акції', to: '/promotions', isPromo: true },
  { label: 'Контакти', to: '/contacts' },
]

export const Header = () => {
  const itemsCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))
  const openCart = useCartStore((state) => state.openCart)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTopBannerOpen, setIsTopBannerOpen] = useState(true)
  const [isTopBannerVisible, setIsTopBannerVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsTopBannerVisible(window.scrollY < 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#eadfcb]/80 bg-[#f4eddc]/92 backdrop-blur-xl">
        {isTopBannerOpen && isTopBannerVisible ? (
          <div className="border-b border-[#eadfcb]/80 bg-[#f4eddc]/92 text-[#3D2616]">
            <div className="relative mx-auto flex h-[30px] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
              <p className="truncate text-center text-xs font-medium leading-none">
                Безкоштовна доставка при замовленні від 2 000 грн
              </p>
              <button
                type="button"
                onClick={() => setIsTopBannerOpen(false)}
                className="absolute right-4 inline-flex h-6 w-6 items-center justify-center rounded-full text-[#3D2616]/75 transition hover:bg-[#eadfcb] hover:text-[#3D2616] sm:right-6 lg:right-8"
                aria-label="Закрити повідомлення"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : null}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="group flex items-center gap-3 text-cocoa-900"
            data-brand-logo="true"
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
              <span className="text-[#5d4037]">Choco</span>
              <span className="text-[#D39B60]">Pix</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={item.to === '/' ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : undefined}
                className={`relative text-[15px] font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                  item.isPromo
                    ? 'text-[#D97AA6] hover:text-[#D97AA6] after:bg-[#D97AA6]'
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
              className="rounded-2xl p-3 text-cocoa-900 transition hover:bg-[#fbf5ea] lg:hidden"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="border-t border-[#eadfcb]/80 bg-[#f4eddc] px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-[15px] font-medium transition hover:bg-[#fbf5ea] ${
                    item.isPromo ? 'text-[#D97AA6] hover:text-[#D97AA6]' : 'text-cocoa-900/72 hover:text-cocoa-900'
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
      <div aria-hidden="true" className={isTopBannerOpen && isTopBannerVisible ? 'h-[118px]' : 'h-[88px]'} />
      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  )
}
