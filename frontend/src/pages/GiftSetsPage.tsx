import { Helmet } from 'react-helmet-async'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function GiftSetsPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const giftSets = products.filter((product) => product.tags.includes('набори'))

  return (
    <>
      <Helmet>
        <title>Подарункові набори какао бомбочок купити | ChocoPix</title>
        <meta
          name="description"
          content="Подарункові набори какао бомбочок з маршмелоу: готові сети для свят, подарунків і сімейних вечорів. Доставка по Україні."
        />
        <meta property="og:title" content="Подарункові набори какао бомбочок купити | ChocoPix" />
        <meta
          property="og:description"
          content="Подарункові набори какао бомбочок з маршмелоу: готові сети для свят, подарунків і сімейних вечорів. Доставка по Україні."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chocopix.store/gift-sets" />
        <meta property="og:image" content="https://chocopix.store/products/gift-set-classic-6-open-box.webp" />
        <link rel="canonical" href="https://chocopix.store/gift-sets" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Категорія</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Подарункові набори</h1>
        <p className="mt-4 max-w-3xl text-[17px] leading-8 text-[#6f4a31]">
          Обирайте готові набори какао бомбочок з маршмелоу для подарунків, родинних свят і затишних вечорів. У колекції є класичні, преміум та
          дитячі варіанти з різними смаками.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {giftSets.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
