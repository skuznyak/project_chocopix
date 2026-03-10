import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderSuccessPage from '@/pages/OrderSuccessPage'

export const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
)
