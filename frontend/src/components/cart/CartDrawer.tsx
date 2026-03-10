import { useEffect } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CartItemRow } from '@/components/cart/CartItemRow'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/utils/formatPrice'

export const CartDrawer = () => {
  const navigate = useNavigate()
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const { detailedItems, totals, removeItem, setQuantity } = useCart()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-cocoa-900/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-label="Закрити кошик"
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[380px] flex-col rounded-l-[28px] border-l border-[#eadfcb] bg-[#f8f1e4] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <h2 className="text-[21px] font-medium tracking-[-0.02em] text-[#6b4331]">Мій кошик</h2>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full p-2 text-cocoa-900/75 transition hover:bg-black/5 hover:text-cocoa-900"
                aria-label="Закрити"
              >
                <X size={18} strokeWidth={2.2} />
              </button>
            </div>

            {detailedItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-white/35 blur-2xl" />
                  <ShoppingCart className="h-20 w-20 text-[#d9d8dc]" strokeWidth={1.6} />
                  <img
                    src="/favicon.svg"
                    alt="ChocoPix"
                    className="absolute left-1/2 top-[40px] h-10 w-10 -translate-x-1/2 rounded-full bg-[#f1dcc0] p-1 shadow-sm"
                  />
                </div>
                <p className="mt-8 text-[19px] font-semibold tracking-[-0.02em] text-[#6b4331]">Ваш кошик порожній</p>
                <Button
                  className="mt-9 min-h-12 min-w-[260px] rounded-[18px] bg-[#7b4b3d] px-8 text-base hover:bg-[#6c4236]"
                  onClick={closeCart}
                >
                  Повернутись до покупок
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5 sm:px-6">
                  {detailedItems.map(({ item, product }) => (
                    <CartItemRow
                      key={product.id}
                      product={product}
                      quantity={item.quantity}
                      onDecrease={() => setQuantity(product.id, item.quantity - 1)}
                      onIncrease={() => setQuantity(product.id, item.quantity + 1)}
                      onRemove={() => removeItem(product.id)}
                    />
                  ))}
                </div>
                <div className="border-t border-cocoa-900/10 px-5 py-4 sm:px-6">
                  <div className="mb-4 flex items-center justify-between gap-4 text-[#5f3925]">
                    <span className="text-sm text-[#8b776c]">Разом</span>
                    <span className="text-xl font-bold">{formatPrice(totals.total)}</span>
                  </div>
                  <Button
                    type="button"
                    fullWidth
                    onClick={() => {
                      closeCart()
                      navigate('/checkout')
                    }}
                  >
                    Оформити замовлення
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
