import { Helmet } from 'react-helmet-async'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { ArrowLeft, Minus, Package, Plus, Trash2, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import { createOrder } from '@/api/orders'
import { validatePromoCode } from '@/api/promoCodes'
import { FREE_DELIVERY_THRESHOLD } from '@/store/cartStore'
import { formatPrice } from '@/utils/formatPrice'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, detailedItems, totals, promoCode, clearCart, removeItem, setQuantity, setPromoCode } = useCart()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [promoInput, setPromoInput] = useState(promoCode ?? '')
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const progress = Math.min((totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)
  const truckProgress = Math.min(Math.max(progress, 3), 97)

  const applyPromo = useCallback(
    async (rawCode: string, options?: { silentSuccess?: boolean }) => {
      const normalizedCode = rawCode.trim().toUpperCase()
      setSubmitError(null)

      if (!normalizedCode) {
        setPromoCode(undefined, 0)
        setPromoFeedback(null)
        return
      }

      setIsApplyingPromo(true)
      try {
        const result = await validatePromoCode(normalizedCode, totals.subtotal)
        if (result.isValid) {
          setPromoCode(normalizedCode, result.discount ?? 0)
          setPromoInput(normalizedCode)
          if (!options?.silentSuccess) {
            setPromoFeedback({
              type: 'success',
              message: `Промокод застосовано. Знижка: ${formatPrice(result.discount ?? 0)}`,
            })
          }
          return
        }

        setPromoCode(undefined, 0)
        setPromoFeedback({
          type: 'error',
          message: result.error ?? 'Промокод недійсний або термін його дії закінчився',
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

  return (
    <>
      <Helmet>
        <title>Оформлення замовлення</title>
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-medium tracking-[-0.04em] text-[#5e3926] sm:text-5xl">Оформлення замовлення</h1>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-base font-semibold text-[#6b4331]"
          >
            <ArrowLeft size={18} />
            Повернутись до покупок
          </button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.62fr]">
          <div className="space-y-4">
            <CheckoutForm
              items={items}
              promoCode={promoCode}
              onSubmit={async (payload) => {
                try {
                  setSubmitError(null)
                  const order = await createOrder(payload)
                  clearCart()
                  setPromoInput('')
                  setPromoFeedback(null)
                  navigate(`/order-success?orderNumber=${order.orderNumber}`)
                } catch (error) {
                  if (axios.isAxiosError(error) && error.response?.status === 400) {
                    const message = typeof error.response.data?.message === 'string'
                      ? error.response.data.message
                      : 'Промокод недійсний або термін його дії закінчився'
                    setSubmitError(message)
                    return
                  }

                  if (axios.isAxiosError(error) && error.response?.status === 500) {
                    setSubmitError('Не вдалося оформити замовлення. Перевірте, чи запущений бекенд, і спробуйте ще раз.')
                    return
                  }

                  setSubmitError('Не вдалося оформити замовлення. Спробуйте ще раз.')
                }
              }}
            />
            {submitError ? <p className="text-sm text-rose-600">{submitError}</p> : null}
          </div>
          <aside className="h-fit rounded-[32px] border border-[#eadfcb] bg-[#f8f1e4] p-5 shadow-[0_20px_40px_rgba(91,28,2,0.06)] sm:p-7">
            <h2 className="text-2xl font-medium tracking-[-0.03em] text-[#5e3926] sm:text-3xl">Ваше замовлення</h2>
            <div className="mt-6 rounded-[24px] border border-[#eadfcb] bg-[#fbf5ea] p-5">
              <div className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.05em] text-[#6b4331] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-sm">
                <div className="flex items-center gap-2">
                  <Package size={16} />
                  Безкоштовна доставка
                </div>
                <span>{formatPrice(totals.subtotal)} / {formatPrice(FREE_DELIVERY_THRESHOLD)}</span>
              </div>
              <div className="relative mt-4 pt-6">
                <div
                  className="absolute left-0 top-0 -translate-y-1 text-[#8c5328] transition-[left] duration-500 ease-out"
                  style={{ left: `${truckProgress}%`, transform: 'translateX(-50%)' }}
                  aria-hidden="true"
                >
                  <Truck size={26} strokeWidth={2.25} />
                </div>
                <div className="h-3 rounded-full bg-[#e7e4e1]">
                  <div
                    className="h-full rounded-full bg-[#7d4a37] transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <p className="mt-4 text-base text-[#8a6b59]">
                <span className={totals.subtotal >= FREE_DELIVERY_THRESHOLD ? 'font-semibold text-[#2f8a57]' : undefined}>
                  {totals.subtotal >= FREE_DELIVERY_THRESHOLD
                    ? 'Ви отримали безкоштовну доставку'
                    : `Додайте ще ${formatPrice(FREE_DELIVERY_THRESHOLD - totals.subtotal)} для безкоштовної доставки`}
                </span>
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {detailedItems.map(({ item, product }) => (
                <div key={product.id} className="rounded-[22px] border border-[#eadfcb] bg-white/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <img src={product.images[0]?.src} alt={product.name} loading="lazy" decoding="async" className="h-14 w-14 rounded-[16px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-semibold text-[#5f3925]">{product.name}</p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => removeItem(product.id)}
                      aria-label="Видалити товар"
                      className="min-h-8 rounded-full p-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-[12px] bg-[#f2e9da] px-2 py-1.5">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, item.quantity - 1)}
                        className="rounded-[8px] bg-[#fffaf2] p-1 text-[#6a4331]"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-5 text-center text-sm font-semibold text-[#5f3925]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, item.quantity + 1)}
                        className="rounded-[8px] bg-[#fffaf2] p-1 text-[#6a4331]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="font-semibold text-[#5f3925]">{formatPrice(product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="flex flex-col gap-2 text-sm font-semibold text-[#5f3925]">
                <span>Промокод</span>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={promoInput}
                    onChange={(event) => setPromoInput(event.target.value.toUpperCase())}
                    className="min-h-14 flex-1 rounded-[18px] border border-[#ddd9d5] bg-[#f5f5f5] px-4 py-3 text-base uppercase text-[#2d1f1a] outline-none transition focus:border-[#c79263] focus:ring-2 focus:ring-[#ead3bb]"
                  />
                  <Button
                    type="button"
                    className="min-h-14 rounded-[18px] bg-[#7d4a37] px-6 text-sm font-bold hover:bg-[#6f4232] sm:w-auto"
                    disabled={isApplyingPromo}
                    onClick={() => {
                      void applyPromo(promoInput)
                    }}
                  >
                    {isApplyingPromo ? 'Перевірка...' : 'Примінити'}
                  </Button>
                </div>
              </label>
              {promoFeedback ? (
                <p className={`mt-2 text-sm ${promoFeedback.type === 'error' ? 'text-rose-600' : 'text-[#2f8a57]'}`}>
                  {promoFeedback.message}
                </p>
              ) : null}
            </div>
            <div className="mt-6 space-y-3 border-t border-dashed border-[#ddd7d2] pt-5 text-base">
              <div className="flex justify-between text-[#7a6050]"><span>Сума:</span><span>{formatPrice(totals.subtotal)}</span></div>
              <div className="flex justify-between text-[#7a6050]">
                <span>Доставка:</span>
                <span className={totals.isFreeDelivery ? 'font-semibold text-[#2f8a57]' : undefined}>
                  {totals.isFreeDelivery ? 'Безкоштовна' : 'За тарифами перевізника'}
                </span>
              </div>
              <div className="flex justify-between text-[#7a6050]"><span>Знижка:</span><span>-{formatPrice(totals.discount)}</span></div>
              <div className="flex justify-between pt-2 text-[28px] font-bold tracking-[-0.04em] text-[#5e3926] sm:text-[34px]"><span>Разом</span><span>{formatPrice(totals.total)}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
