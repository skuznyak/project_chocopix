import { Outlet } from 'react-router-dom'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton'

export const Layout = () => (
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
