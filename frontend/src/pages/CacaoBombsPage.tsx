import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl, buildBreadcrumbSchema } from '@/utils/seo'

const faqItems = [
  {
    question: 'Як використовувати какао бомбочку?',
    answer:
      'Покладіть бомбочку в велику чашку, залийте 250-300 мл гарячого молока та зачекайте, поки оболонка розкриється. Потім легко перемішайте напій, щоб отримати рівний смак гарячого шоколаду з маршмелоу.',
  },
  {
    question: 'Як приготувати какао бомбочку вдома?',
    answer:
      'Для приготування не потрібні додаткові інгредієнти: лише чашка та гаряче молоко. Якщо хочете більш насичений смак, використовуйте молоко підвищеної жирності та дайте бомбочці повністю розчинитися.',
  },
  {
    question: 'Як пити какао бомбочку?',
    answer:
      'Найкраще смакувати напій одразу після приготування, поки маршмелоу мʼякі, а шоколад добре поєднався з молоком. Напій підходить для домашнього вечора, частування гостей або солодкої паузи протягом дня.',
  },
  {
    question: 'Як зберігати шоколадні бомбочки з маршмелоу?',
    answer:
      'Зберігайте їх у сухому прохолодному місці без прямих сонячних променів. Оптимально тримати упаковку щільно закритою, щоб шоколад і маршмелоу зберігали текстуру та аромат.',
  },
]

export default function CacaoBombsPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const giftSets = products.filter((product) => product.category === 'gift-set')
  const cacaoBombs = products.filter((product) => product.tags.includes('бомбочки') && product.category !== 'gift-set')
  const featuredGiftSets = giftSets.slice(0, 3)
  const featuredBombs = cacaoBombs.slice(0, 3)
  const categoryUrl = buildAbsoluteUrl('/cacao-bombs')
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Головна', path: '/' },
    { name: 'Какао бомбочки', path: '/cacao-bombs' },
  ])
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Какао бомбочки з маршмелоу ChocoPix',
    url: categoryUrl,
    description: 'Какао бомбочки з маршмелоу, окремі смаки та подарункові набори з доставкою по Україні.',
    inLanguage: 'uk-UA',
    isPartOf: buildAbsoluteUrl('/'),
    about: ['какао бомбочки', 'шоколадні бомбочки з маршмелоу', 'гарячий шоколад', 'подарункові набори какао бомбочок'],
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Какао бомбочки ChocoPix',
    itemListElement: cacaoBombs.map((product, index) => ({
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

  return (
    <>
      <Helmet>
        <title>Какао бомбочки купити | Шоколадні бомбочки з маршмелоу | ChocoPix</title>
        <meta
          name="description"
          content="Какао бомбочки з маршмелоу купити поштучно або в наборі. Шоколадні бомбочки ручної роботи з доставкою по Україні від ChocoPix."
        />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Какао бомбочки купити | Шоколадні бомбочки з маршмелоу | ChocoPix" />
        <meta
          property="og:description"
          content="Какао бомбочки з маршмелоу купити поштучно або в наборі. Шоколадні бомбочки ручної роботи з доставкою по Україні від ChocoPix."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={categoryUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Шоколадні бомбочки з маршмелоу ChocoPix" />
        <link rel="canonical" href={categoryUrl} />
        <script type="application/ld+json">{JSON.stringify(collectionPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="breadcrumb" className="text-sm text-cocoa-900/55">
          <Link to="/">Головна</Link> / <span>Какао бомбочки</span>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Категорія</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">Какао бомбочки з маршмелоу</h1>
        <div className="mt-4 space-y-1 text-[17px] leading-8 text-[#3D2616]">
          <p>
            Какао бомбочки з маршмелоу - десерт для гарячого шоколаду, подарунка або затишного вечора. Залийте гарячим молоком і
            насолоджуйтесь.
          </p>
          <p>
            Купити какао бомбочки з доставкою по Україні можна у вигляді подарункових наборів або поштучно.
          </p>
        </div>

        <section className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Додатково</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#3D2616]">Подарункові набори з какао бомбочками</h2>
          <div className="mt-3 space-y-3 text-[17px] leading-8 text-[#3D2616]">
            <p>
              Якщо потрібен готовий подарунок, перегляньте{' '}
              <Link to="/gift-sets" className="font-semibold underline underline-offset-4">
                окрему сторінку наборів
              </Link>
              . Нижче лише кілька популярних варіантів:
              {' '}
              {featuredGiftSets.map((product, index) => (
                <span key={product.id}>
                  <Link to={`/product/${product.slug ?? product.id}`} className="font-semibold underline underline-offset-4">
                    {product.name}
                  </Link>
                  {index < featuredGiftSets.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {giftSets.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Окремі смаки</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#3D2616]">Какао бомбочки поштучно</h2>
          <div className="mt-3 space-y-3 text-[17px] leading-8 text-[#3D2616]">
            <p>
              Це основна категорія для тих, хто хоче купити какао бомбочки поштучно, спробувати конкретний смак або самостійно зібрати замовлення.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cacaoBombs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <div className="mt-8 space-y-3 text-[17px] leading-8 text-[#3D2616]">
          <p>
            Для швидкого старту перегляньте популярні смаки:{' '}
            {featuredBombs.map((product, index) => (
              <span key={product.id}>
                <Link to={`/product/${product.slug ?? product.id}`} className="font-semibold underline underline-offset-4">
                  {product.name}
                </Link>
                {index < featuredBombs.length - 1 ? ', ' : '.'}
              </span>
            ))}{' '}
            Також можна перейти на <Link to="/promotions" className="font-semibold underline underline-offset-4">сторінку акцій</Link>{' '}
            або повернутися на <Link to="/" className="font-semibold underline underline-offset-4">головну</Link>.
          </p>
          <p>
            Це сторінка саме для окремих шоколадних бомбочок з маршмелоу. Якщо хочеться зробити напій ще десертнішим, можна окремо{' '}
            <Link to="/marshmallow" className="font-semibold underline underline-offset-4">додати маршмелоу</Link>.
          </p>
        </div>

        <section className="mt-10 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#3D2616]">
            Поширені запитання: какао бомбочки з маршмелоу
          </h2>
          <div className="mt-5 space-y-3">
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
