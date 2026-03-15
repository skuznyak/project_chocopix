import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
