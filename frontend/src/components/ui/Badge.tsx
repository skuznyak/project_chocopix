import clsx from 'clsx'
import type { ProductBadge } from '@chocopix/shared'

const badgeLabels: Record<ProductBadge, string> = {
  hit: 'Хіт',
  new: 'Новинка',
  sale: 'Знижка',
}

export const Badge = ({ badge }: { badge: ProductBadge }) => (
  <span
    className={clsx('rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.18em]', {
      'bg-gold/20 text-cocoa-900': badge === 'hit',
      'bg-emerald-100 text-emerald-800': badge === 'new',
      'bg-rose-100 text-rose-700': badge === 'sale',
    })}
  >
    {badgeLabels[badge]}
  </span>
)
