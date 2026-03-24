import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl, buildBreadcrumbSchema } from '@/utils/seo'

export default function CacaoBombsPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const cacaoBombs = products.filter((product) => product.tags.includes('бомбочки'))
  const categoryUrl = buildAbsoluteUrl('/cacao-bombs')
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Головна', path: '/' },
    { name: 'Шоколадні бомбочки', path: '/cacao-bombs' },
  ])

  return (
    <>
      <Helmet>
        <title>Шоколадні бомбочки з маршмелоу купити | Какао бомбочки | ChocoPix</title>
        <meta
          name="description"
          content="Шоколадні бомбочки та какао бомбочки з маршмелоу купити онлайн. Ручна робота, різні смаки та доставка по Україні."
        />
        <meta property="og:title" content="Шоколадні бомбочки з маршмелоу купити | Какао бомбочки | ChocoPix" />
        <meta
          property="og:description"
          content="Шоколадні бомбочки та какао бомбочки з маршмелоу купити онлайн. Ручна робота, різні смаки та доставка по Україні."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={categoryUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Шоколадні бомбочки з маршмелоу ChocoPix" />
        <link rel="canonical" href={categoryUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="breadcrumb" className="text-sm text-cocoa-900/55">
          <Link to="/">Головна</Link> / <span>Шоколадні бомбочки</span>
        </nav>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Категорія</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Шоколадні бомбочки з маршмелоу</h1>
        <div className="mt-6 space-y-4 text-[17px] leading-8 text-[#6f4a31]">
          <p>
            Шоколадні бомбочки з маршмелоу - це зручний спосіб приготувати ароматний гарячий шоколад вдома. Достатньо покласти бомбочку в чашку,
            залити гарячим молоком і дочекатися, поки шоколад розкриється та випустить маршмелоу. Такий десертний формат підходить для сімейного
            вечора, подарунка або святкового частування.
          </p>
          <p>
            У категорії зібрані какао бомбочки з різними смаками: від класичних до більш насичених десертних варіантів. Якщо ви хочете купити
            шоколадні бомбочки з доставкою по Україні, обирайте позиції в каталозі ChocoPix і поєднуйте їх з <Link to="/gift-sets" className="font-semibold underline underline-offset-4">подарунковими наборами</Link> для
            свят, гостей і теплих домашніх моментів.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cacaoBombs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
