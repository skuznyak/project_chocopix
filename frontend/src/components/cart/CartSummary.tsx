import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatPrice } from '@/utils/formatPrice'

interface CartSummaryProps {
  subtotal: number
  discount: number
  delivery: number
  total: number
  promoCode?: string
  onApplyPromoCode: (value: string) => void
  actionLabel?: string
  onAction?: () => void
}

export const CartSummary = ({
  subtotal,
  discount,
  delivery,
  total,
  promoCode,
  onApplyPromoCode,
  actionLabel = 'Оформити замовлення',
  onAction,
}: CartSummaryProps) => (
  <aside className="rounded-[32px] border border-cocoa-900/10 bg-white/85 p-6 shadow-soft">
    <h2 className="font-display text-3xl">Підсумок</h2>
    <div className="mt-5 space-y-3 text-sm">
      <div className="flex justify-between"><span>Товари</span><span>{formatPrice(subtotal)}</span></div>
      <div className="flex justify-between"><span>Знижка</span><span>-{formatPrice(discount)}</span></div>
      <div className="flex justify-between"><span>Доставка</span><span>{delivery === 0 ? 'Безкоштовно' : formatPrice(delivery)}</span></div>
      <div className="flex justify-between border-t border-cocoa-900/10 pt-3 text-base font-semibold"><span>Разом</span><span>{formatPrice(total)}</span></div>
    </div>
    <div className="mt-6">
      <Input
        label="Промокод"
        placeholder="CHOCO10"
        defaultValue={promoCode}
        onBlur={(event) => onApplyPromoCode(event.target.value)}
      />
    </div>
    <p className="mt-3 text-xs text-cocoa-900/55">Безкоштовна доставка від 2000 грн.</p>
    <Button type="button" fullWidth className="mt-5" onClick={onAction}>
      {actionLabel}
    </Button>
  </aside>
)
