import { Minus, Plus, Trash2 } from 'lucide-react'
import type { Product } from '@chocopix/shared'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/utils/formatPrice'

interface CartItemRowProps {
  product: Product
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  onRemove: () => void
}

export const CartItemRow = ({
  product,
  quantity,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemRowProps) => (
  <article className="flex items-center gap-3 rounded-[22px] bg-[#fbf5ea] p-3">
    <img src={product.images[0]?.src} alt={product.images[0]?.alt} className="h-16 w-16 rounded-[16px] object-cover" />
    <div className="min-w-0 flex-1">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-[#5f3925]">{product.name}</h3>
        </div>
        <Button variant="ghost" onClick={onRemove} aria-label="Видалити товар" className="min-h-8 rounded-full p-2">
          <Trash2 size={16} />
        </Button>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-[12px] bg-[#f2e9da] px-2 py-1.5">
          <button type="button" onClick={onDecrease} className="rounded-[8px] bg-[#fffaf2] p-1 text-[#6a4331]">
            <Minus size={16} />
          </button>
          <span className="min-w-5 text-center text-sm font-semibold text-[#5f3925]">{quantity}</span>
          <button type="button" onClick={onIncrease} className="rounded-[8px] bg-[#fffaf2] p-1 text-[#6a4331]">
            <Plus size={16} />
          </button>
        </div>
        <p className="whitespace-nowrap text-sm font-bold text-[#5f3925]">{formatPrice(product.price * quantity)}</p>
      </div>
    </div>
  </article>
)
