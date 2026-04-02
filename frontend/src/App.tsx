import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ProductPage = lazy(() => import('@/pages/ProductPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const OrderSuccessPage = lazy(() => import('@/pages/OrderSuccessPage'))
const CacaoBombsPage = lazy(() => import('@/pages/CacaoBombsPage'))
const MarshmallowPage = lazy(() => import('@/pages/MarshmallowPage'))
const GiftSetsPage = lazy(() => import('@/pages/GiftSetsPage'))
const PromotionsPage = lazy(() => import('@/pages/PromotionsPage'))
const ContactsPage = lazy(() => import('@/pages/ContactsPage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'))
const DeliveryPage = lazy(() => import('@/pages/DeliveryPage'))
const RefundPage = lazy(() => import('@/pages/RefundPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const App = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slugOrId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/cacao-bombs" element={<CacaoBombsPage />} />
        <Route path="/marshmallow" element={<MarshmallowPage />} />
        <Route path="/gift-sets" element={<GiftSetsPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
)
