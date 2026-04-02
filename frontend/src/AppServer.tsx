import { Route, Routes } from 'react-router-dom'
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
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import DeliveryPage from '@/pages/DeliveryPage'
import RefundPage from '@/pages/RefundPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const AppServer = () => (
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
)
