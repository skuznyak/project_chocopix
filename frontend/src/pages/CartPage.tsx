import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title>Кошик — Шоколадні бомбочки</title>
      </Helmet>
      <Navigate to="/" replace />
    </>
  )
}
