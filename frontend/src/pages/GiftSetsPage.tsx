import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { buildAbsoluteUrl, buildBreadcrumbSchema, toAbsoluteImageUrl } from '@/utils/seo'

const faqItems = [
  {
    question: 'Який подарунковий набір какао бомбочок обрати?',
    answer:
      'Обирайте за кількістю бомбочок і сценарієм: компактні набори підійдуть для невеликого подарунка, а великі бокси зручні для сімейного вечора, свята або частування гостей.',
  },
  {
    question: 'Чи підходять набори для подарунка?',
    answer:
      'Так, це готовий подарунковий формат: кілька смаків в одній коробці, акуратна подача та можливість швидко замовити солодкий презент без додаткового комплектування.',
  },
  {
    question: 'Чи можна додати до набору маршмелоу?',
    answer:
      'Так, до замовлення легко додати окреме маршмелоу ручної роботи, якщо хочете зробити подарунок більш десертним або доповнити какао.',
  },
  {
    question: 'Чи є доставка подарункових наборів по Україні?',
    answer:
      'Так, ChocoPix відправляє подарункові набори по Україні. Перед оформленням можна обрати потрібний формат, а деталі доставки уточнюються на етапі замовлення.',
  },
]

export default function GiftSetsPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const giftSets = products.filter((product) => product.category === 'gift-set')
  const featuredGiftSets = giftSets.slice(0, 3)
  const categoryUrl = buildAbsoluteUrl('/gift-sets')
  const categoryTitle = 'Подарункові набори какао бомбочок купити | Шоколадні набори | ChocoPix'
  const categoryDescription =
    'Подарункові набори какао бомбочок і шоколадних бомбочок з маршмелоу купити з доставкою по Україні. Готові солодкі подарунки від ChocoPix.'
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Головна', path: '/' },
    { name: 'Подарункові набори какао бомбочок', path: '/gift-sets' },
  ])
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Подарункові набори какао бомбочок ChocoPix',
    url: categoryUrl,
    description: categoryDescription,
    inLanguage: 'uk-UA',
    isPartOf: buildAbsoluteUrl('/'),
    about: ['подарункові набори какао бомбочок', 'набори шоколадних бомбочок', 'солодкі подарунки', 'какао бомбочки з маршмелоу'],
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Подарункові набори ChocoPix',
    itemListElement: giftSets.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: buildAbsoluteUrl(`/product/${product.slug ?? product.id}`),
      name: product.name,
    })),
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
  const ogImage = toAbsoluteImageUrl(giftSets[0]?.images[0]?.src)

  return (
    <>
      <Helmet>
        <title>{categoryTitle}</title>
        <meta name="description" content={categoryDescription} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={categoryTitle} />
        <meta property="og:description" content={categoryDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={categoryUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Подарункові набори какао бомбочок ChocoPix" />
        <link rel="canonical" href={categoryUrl} />
        <script type="application/ld+json">{JSON.stringify(collectionPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="breadcrumb" className="text-sm text-cocoa-900/55">
          <Link to="/">Головна</Link> / <span>Подарункові набори какао бомбочок</span>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Категорія</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">Подарункові набори какао бомбочок</h1>
        <div className="mt-4 space-y-4 text-[17px] leading-8 text-[#3D2616]">
          <p>
            Тут зібрані подарункові набори какао бомбочок для дня народження, сімейного подарунка або невеликого солодкого компліменту.
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
              какао бомбочки поштучно
            </Link>
            , а для мʼякого десертного доповнення до боксу відкрийте{' '}
            <Link to="/marshmallow" className="font-semibold underline underline-offset-4">
              маршмелоу ручної роботи
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {giftSets.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 space-y-4 text-[17px] leading-8 text-[#3D2616]">
          <p>
            Якщо потрібен готовий солодкий подарунок без зайвого вибору, ця категорія закриває саме такий запит. Окремі смаки{' '}
            <Link to="/marshmallow" className="font-semibold underline underline-offset-4">
              маршмелоу до подарунка
            </Link>{' '}
            теж легко додати до замовлення.
          </p>
        </div>

        <section className="mt-14 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#3D2616]">
            Поширені запитання про подарункові набори какао бомбочок
          </h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-[24px] border border-[#eadfcb] bg-white/60 p-5">
                <summary className="cursor-pointer list-none font-semibold text-[#3D2616]">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-cocoa-900/72">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
