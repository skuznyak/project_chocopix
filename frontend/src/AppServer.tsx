import { Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderSuccessPage from '@/pages/OrderSuccessPage'
import CacaoBombsPage from '@/pages/CacaoBombsPage'
import MarshmallowPage from '@/pages/MarshmallowPage'
import GiftSetsPage from '@/pages/GiftSetsPage'
import PromotionsPage from '@/pages/PromotionsPage'
import ContactsPage from '@/pages/ContactsPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const AppServer = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slugOrId" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/cups" element={<Navigate to="/cacao-bombs" replace />} />
      <Route path="/cacao-bombs" element={<CacaoBombsPage />} />
      <Route path="/marshmallow" element={<MarshmallowPage />} />
      <Route path="/gift-sets" element={<GiftSetsPage />} />
      <Route path="/promotions" element={<PromotionsPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)
