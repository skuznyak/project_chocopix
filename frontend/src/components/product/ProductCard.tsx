import { useRef, useState } from 'react'
import { Check, Plus, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '@chocopix/shared'
import { Badge } from '@/components/ui/Badge'
import { useCartStore } from '@/store/cartStore'
import { animateAddToCart } from '@/utils/animateAddToCart'
import { formatPrice } from '@/utils/formatPrice'

const PlusIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    animate={{ rotate: isHovered ? 180 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <Plus size={24} strokeWidth={2.5} />
  </motion.div>
)

export const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isAdded, setIsAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[34px] border border-[#eadfcb] bg-[#f8f1e4] shadow-[0_18px_40px_rgba(92,55,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(92,55,28,0.1)]">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} aria-label={`Відкрити ${product.name}`}>
          <img
            ref={imageRef}
            src={product.images[0]?.src}
            alt={product.images[0]?.alt}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {product.badge ? <div className="absolute left-4 top-4"><Badge badge={product.badge} /></div> : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-[#4c1d11]">{product.name}</h3>
          <div className="flex items-center gap-1 text-sm text-cocoa-900/70">
            <Star size={14} className="fill-gold text-gold" />
            {product.reviewSummary.rating}
          </div>
        </div>
        <p className="mt-3 text-sm leading-7 text-[#7c5338]">{product.shortDescription}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          {product.previousPrice ? (
            <span className="text-sm text-cocoa-900/40 line-through">{formatPrice(product.previousPrice)}</span>
          ) : null}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa-900/70 transition hover:text-cocoa-900"
          >
            Детальніше
          </Link>
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={isAdded ? { scale: [1, 1.18, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#8c5328] text-white shadow-[0_16px_30px_rgba(91,28,2,0.22)] transition hover:bg-[#d29b60]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              animateAddToCart(imageRef.current)
              addItem(product.id)
              setIsAdded(true)
              window.setTimeout(() => {
                setIsAdded(false)
              }, 650)
            }}
          >
            {isAdded ? <Check size={24} className="text-[#65d46e]" /> : <PlusIcon isHovered={isHovered} />}
          </motion.button>
        </div>
      </div>
    </article>
  )
}
