import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton'

export const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.search, location.hash])

  return (
    <div className="min-h-screen text-cocoa-900">
      <Header />
      <CartDrawer />
      <ScrollToTopButton />
      <main>
        {location.pathname !== '/' ? (
          <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-[#a4693f] px-4 py-2 text-sm font-semibold text-[#6b4331] transition hover:bg-[#fbf5ea]"
            >
              На головну
            </Link>
          </div>
        ) : null}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
