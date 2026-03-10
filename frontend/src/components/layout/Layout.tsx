import { Outlet } from 'react-router-dom'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const Layout = () => (
  <div className="min-h-screen text-cocoa-900">
    <Header />
    <CartDrawer />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
)
