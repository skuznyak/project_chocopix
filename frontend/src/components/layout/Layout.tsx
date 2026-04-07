import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton'
import { organizationSchema, shouldIncludeSitewideSchemas, websiteSchema } from '@/utils/seo'

export const Layout = () => {
  const location = useLocation()
  const includeSitewideSchemas = shouldIncludeSitewideSchemas(location.pathname)
  const hasTrackedInitialPageView = useRef(false)

  useEffect(() => {
    if (location.hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    if (!hasTrackedInitialPageView.current) {
      hasTrackedInitialPageView.current = true
      return
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [location.pathname, location.search])

  return (
    <div className="min-h-screen text-cocoa-900">
      <Helmet>
        {includeSitewideSchemas ? <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script> : null}
        {includeSitewideSchemas ? <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script> : null}
      </Helmet>
      <Header />
      <CartDrawer />
      <ChatWidget />
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
