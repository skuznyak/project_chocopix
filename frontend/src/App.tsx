import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ProductPage = lazy(() => import('@/pages/ProductPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const OrderSuccessPage = lazy(() => import('@/pages/OrderSuccessPage'))
const CacaoBombsPage = lazy(() => import('@/pages/CacaoBombsPage'))
const GiftSetsPage = lazy(() => import('@/pages/GiftSetsPage'))
const PromotionsPage = lazy(() => import('@/pages/PromotionsPage'))
const ContactsPage = lazy(() => import('@/pages/ContactsPage'))

export const App = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slugOrId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/cups" element={<Navigate to="/" replace />} />
        <Route path="/cacao-bombs" element={<CacaoBombsPage />} />
        <Route path="/gift-sets" element={<GiftSetsPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </Suspense>
)
