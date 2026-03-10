import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import axios from 'axios'
import { ArrowLeft, Minus, Package, Plus, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { createOrder } from '@/api/orders'
import { FREE_DELIVERY_THRESHOLD } from '@/store/cartStore'
import { formatPrice } from '@/utils/formatPrice'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { items, detailedItems, totals, promoCode, clearCart, removeItem, setQuantity, applyPromoCode } = useCart()
  const progress = Math.min((totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)

  return (
    <>
      <Helmet>
        <title>Оформлення замовлення</title>
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-5xl font-medium tracking-[-0.04em] text-[#5e3926]">Оформлення замовлення</h1>
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
                  navigate(`/order-success?orderNumber=${order.orderNumber}`)
                } catch (error) {
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
          <aside className="h-fit rounded-[32px] border border-[#eadfcb] bg-[#f8f1e4] p-7 shadow-[0_20px_40px_rgba(91,28,2,0.06)]">
            <h2 className="text-3xl font-medium tracking-[-0.03em] text-[#5e3926]">Ваше замовлення</h2>
            <div className="mt-6 rounded-[24px] border border-[#eadfcb] bg-[#fbf5ea] p-5">
              <div className="flex items-center justify-between gap-4 text-sm font-bold uppercase tracking-[0.05em] text-[#6b4331]">
                <div className="flex items-center gap-2">
                  <Package size={16} />
                  Безкоштовна доставка
                </div>
                <span>{formatPrice(totals.subtotal)} / {formatPrice(FREE_DELIVERY_THRESHOLD)}</span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-[#e7e4e1]">
                <div
                  className="h-full rounded-full bg-[#7d4a37]"
                  style={{ width: `${progress}%` }}
                />
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
                    <img src={product.images[0]?.src} alt={product.name} className="h-14 w-14 rounded-[16px] object-cover" />
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
              <Input
                label="Промокод"
                placeholder="CHOCO10"
                defaultValue={promoCode}
                onBlur={(event) => applyPromoCode(event.target.value)}
              />
            </div>
            <div className="mt-6 space-y-3 border-t border-dashed border-[#ddd7d2] pt-5 text-base">
              <div className="flex justify-between text-[#7a6050]"><span>Сума:</span><span>{formatPrice(totals.subtotal)}</span></div>
              <div className="flex justify-between text-[#7a6050]">
                <span>Доставка:</span>
                <span className={totals.delivery === 0 ? 'font-semibold text-[#2f8a57]' : undefined}>
                  {totals.delivery === 0 ? 'Безкоштовна' : 'За тарифами перевізника'}
                </span>
              </div>
              <div className="flex justify-between text-[#7a6050]"><span>Знижка:</span><span>-{formatPrice(totals.discount)}</span></div>
              <div className="flex justify-between pt-2 text-[34px] font-bold tracking-[-0.04em] text-[#5e3926]"><span>Разом</span><span>{formatPrice(totals.total)}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
