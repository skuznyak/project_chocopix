import { Link } from 'react-router-dom'
import type { Product } from '@chocopix/shared'
import { ProductCard } from '@/components/product/ProductCard'

type CatalogSectionProps = {
  eyebrow: string
  title: string
  description: string
  products: Product[]
  nextHref?: string
  nextLabel?: string
  supportingLink?: {
    href: string
    label: string
    prefix: string
  }
}

export const CatalogSection = ({
  eyebrow,
  title,
  description,
  products,
  nextHref,
  nextLabel,
  supportingLink,
}: CatalogSectionProps) => (
  <section className="py-12">
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-[#3D2616] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-lg text-[#3D2616]">{description}</p>
        {supportingLink ? (
          <p className="mt-3 max-w-xl text-base text-[#3D2616]">
            {supportingLink.prefix}{' '}
            <Link to={supportingLink.href} className="font-semibold underline underline-offset-4">
              {supportingLink.label}
            </Link>
            .
          </p>
        ) : null}
      </div>
      {nextHref && nextLabel ? (
        <a href={nextHref} className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-cocoa-900/70 transition hover:text-cocoa-900 lg:block">
          {nextLabel} →
        </a>
      ) : null}
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
)

export default CatalogSection
