import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function GiftSetsPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const giftSets = products.filter((product) => product.tags.includes('набори'))
  const featuredGiftSets = giftSets.slice(0, 3)

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
        <div className="mt-4 space-y-4 text-[17px] leading-8 text-[#6f4a31]">
          <p>
            Обирайте готові подарункові набори какао бомбочок з маршмелоу для різних ситуацій: день народження, сезонні свята, сімейний подарунок
            чи затишний вечір удома. У колекції є класичні, преміум і дитячі формати з різною кількістю смаків.
          </p>
          <p>
            Якщо шукаєте набір саме під подію, почніть із{' '}
            {featuredGiftSets.map((product, index) => (
              <span key={product.id}>
                <Link to={`/product/${product.slug ?? product.id}`} className="font-semibold underline underline-offset-4">
                  {product.name}
                </Link>
                {index < featuredGiftSets.length - 1 ? ', ' : '.'}
              </span>
            ))}{' '}
            Для окремих смаків перегляньте також{' '}
            <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">
              категорію шоколадних бомбочок
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {giftSets.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 space-y-4 text-[17px] leading-8 text-[#6f4a31]">
          <p>
            Якщо потрібен солодкий подарунок без зайвого вибору, подарунковий набір з шоколаду закриває одразу кілька сценаріїв: день народження,
            свята, комплімент дівчині або затишний вечір удома з готовим асорті смаків.
          </p>
        </div>
      </div>
    </>
  )
}
