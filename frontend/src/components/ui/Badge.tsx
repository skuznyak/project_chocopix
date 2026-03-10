import clsx from 'clsx'
import type { ProductBadge } from '@chocopix/shared'

const badgeLabels: Record<ProductBadge, string> = {
  hit: 'Хіт',
  new: 'Новинка',
  sale: 'Знижка',
}

export const Badge = ({ badge }: { badge: ProductBadge }) => (
  <span
    className={clsx('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]', {
      'bg-gold/20 text-cocoa-900': badge === 'hit',
      'bg-emerald-100 text-emerald-800': badge === 'new',
      'bg-rose-100 text-rose-700': badge === 'sale',
    })}
  >
    {badgeLabels[badge]}
  </span>
)
