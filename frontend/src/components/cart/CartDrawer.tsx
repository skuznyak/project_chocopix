import { useCallback, useEffect, useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { validatePromoCode } from '@/api/promoCodes'
import { CartItemRow } from '@/components/cart/CartItemRow'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/utils/formatPrice'

export const CartDrawer = () => {
  const navigate = useNavigate()
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const { detailedItems, totals, promoCode, setPromoCode, removeItem, setQuantity } = useCart()
  const [promoInput, setPromoInput] = useState(promoCode ?? '')
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

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

  useEffect(() => {
    if (!isOpen) return
    setPromoInput(promoCode ?? '')
    setPromoFeedback(null)
  }, [isOpen])

  const applyPromo = useCallback(
    async (rawCode: string, options?: { silentSuccess?: boolean }) => {
      const normalizedCode = rawCode.trim().toUpperCase()

      if (!normalizedCode) {
        setPromoCode(undefined, 0)
        setPromoInput('')
        setPromoFeedback(null)
        return
      }

      setIsApplyingPromo(true)
      try {
        const result = await validatePromoCode(normalizedCode, totals.subtotal)
        if (result.isValid) {
          const discount = result.discount ?? 0
          setPromoCode(normalizedCode, discount)
          setPromoInput(normalizedCode)
          if (!options?.silentSuccess) {
            setPromoFeedback({
              type: 'success',
              message: `Промокод застосовано. Знижка: ${formatPrice(discount)}`,
            })
          }
          return
        }

        setPromoCode(undefined, 0)
        setPromoFeedback({
          type: 'error',
          message: 'Промокод недійсний або термін його дії закінчився',
        })
      } catch {
        setPromoCode(undefined, 0)
        setPromoFeedback({
          type: 'error',
          message: 'Промокод недійсний або термін його дії закінчився',
        })
      } finally {
        setIsApplyingPromo(false)
      }
    },
    [setPromoCode, totals.subtotal],
  )

  useEffect(() => {
    if (!promoCode) return
    void applyPromo(promoCode, { silentSuccess: true })
  }, [applyPromo, promoCode, totals.subtotal])

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
                  <div className="mb-4">
                    <label className="flex flex-col gap-2 text-sm font-semibold text-[#5f3925]">
                      <span>Промокод</span>
                      <div className="flex gap-2">
                        <input
                          value={promoInput}
                          onChange={(event) => setPromoInput(event.target.value.toUpperCase())}
                          className="min-h-11 flex-1 rounded-[14px] border border-[#ddd9d5] bg-[#f5f5f5] px-3 py-2 text-sm uppercase text-[#2d1f1a] outline-none transition focus:border-[#c79263] focus:ring-2 focus:ring-[#ead3bb]"
                        />
                        <Button
                          type="button"
                          className="min-h-11 rounded-[14px] bg-[#7d4a37] px-4 text-xs font-bold hover:bg-[#6f4232]"
                          disabled={isApplyingPromo}
                          onClick={() => {
                            void applyPromo(promoInput)
                          }}
                        >
                          {isApplyingPromo ? '...' : 'OK'}
                        </Button>
                      </div>
                    </label>
                    {promoFeedback ? (
                      <p className={`mt-2 text-xs ${promoFeedback.type === 'error' ? 'text-rose-600' : 'text-[#2f8a57]'}`}>
                        {promoFeedback.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-4 space-y-2 text-sm text-[#5f3925]">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#8b776c]">Сума</span>
                      <span>{formatPrice(totals.subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[#8b776c]">Знижка</span>
                      <span>-{formatPrice(totals.discount)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-base font-bold">
                      <span>Разом</span>
                      <span>{formatPrice(totals.total)}</span>
                    </div>
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
