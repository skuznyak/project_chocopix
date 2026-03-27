import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl, buildBreadcrumbSchema, toAbsoluteImageUrl } from '@/utils/seo'

const faqItems = [
  {
    question: 'Що таке крафтове маршмелоу?',
    answer: 'Це маршмелоу ручної роботи з мʼякою текстурою, виразними смаками та акуратною десертною подачею.',
  },
  {
    question: 'Чим ці маршмелоу відрізняються від звичайних?',
    answer: 'У них більш цікаві смакові поєднання, делікатніша текстура та формат, який підходить і для какао, і для подарунка, і для десертної подачі.',
  },
  {
    question: 'Чи підходять вони для подарунка?',
    answer: 'Так, це зручний солодкий формат для невеликого подарунка, компліменту або доповнення до подарункового набору.',
  },
  {
    question: 'Чи можна додавати їх до какао?',
    answer: 'Так, кілька шматочків добре доповнюють гаряче какао, каву або десертну подачу вдома.',
  },
  {
    question: 'Як краще зберігати маршмелоу?',
    answer: 'Тримайте їх у сухому прохолодному місці, подалі від сонця та зайвої вологи, щоб зберегти мʼякість і аромат.',
  },
]

export default function MarshmallowPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const marshmallowProducts = products.filter((product) => product.category === 'marshmallow' || product.tags.includes('маршмелоу'))
  const featuredProducts = marshmallowProducts.slice(0, 3)
  const categoryUrl = buildAbsoluteUrl('/marshmallow')
  const categoryTitle = 'Маршмелоу купити - крафтове для какао та подарунків | ChocoPix'
  const categoryDescription =
    'Крафтове маршмелоу ручної роботи для какао, подарунків і десертів. Купити маршмелоу від ChocoPix з доставкою по Україні.'
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Головна', path: '/' },
    { name: 'Маршмелоу', path: '/marshmallow' },
  ])
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Крафтове маршмелоу ChocoPix',
    url: categoryUrl,
    description: categoryDescription,
    inLanguage: 'uk-UA',
    isPartOf: buildAbsoluteUrl('/'),
    about: ['крафтове маршмелоу', 'маршмелоу ручної роботи', 'маршмелоу для какао', 'маршмелоу для подарунків'],
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Маршмелоу ручної роботи ChocoPix',
    itemListElement: marshmallowProducts.map((product, index) => ({
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
  const ogImage = toAbsoluteImageUrl(marshmallowProducts[0]?.images[0]?.src) || DEFAULT_OG_IMAGE

  return (
    <>
      <Helmet>
        <title>{categoryTitle}</title>
        <meta name="description" content={categoryDescription} />
        <meta property="og:title" content={categoryTitle} />
        <meta property="og:description" content={categoryDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={categoryUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Каталог крафтового маршмелоу від ChocoPix" />
        <link rel="canonical" href={categoryUrl} />
        <script type="application/ld+json">{JSON.stringify(collectionPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="breadcrumb" className="text-sm text-cocoa-900/55">
          <Link to="/">Головна</Link> / <span>Маршмелоу</span>
        </nav>

        <section className="mt-4 rounded-[34px] border border-[#eadfcb] bg-[linear-gradient(135deg,#fbf6ee_0%,#f4e5d5_58%,#f8efe2_100%)] px-6 py-8 shadow-soft sm:px-8 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Нова категорія</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">
            Маршмелоу купити для какао та подарунків
          </h1>
          <div className="mt-6 space-y-4 text-[17px] leading-8 text-[#3D2616]">
            <p>
              У цій категорії зібране крафтове маршмелоу ручної роботи з авторськими смаками. Таке маршмелоу можна купити для гарячого какао,
              солодкого подарунка або десертної подачі вдома чи на свято.
            </p>
            <p>
              Якщо хочете зібрати теплий солодкий комплект, поєднуйте маршмелоу з{' '}
              <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">какао бомбочками</Link> або додавайте до{' '}
              <Link to="/gift-sets" className="font-semibold underline underline-offset-4">подарункових наборів</Link>.
            </p>
          </div>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {marshmallowProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <section className="mt-10 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Про категорію</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#3D2616]">
            Крафтове маршмелоу ручної роботи для щоденних і подарункових замовлень
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-8 text-[#3D2616]">
            <p>
              Каталог маршмелоу ChocoPix підійде тим, хто шукає крафтове маршмелоу без масмаркетного смаку. Тут є позиції для какао, невеликого
              подарунка, святкового столу та десертної подачі.
            </p>
            <p>
              Для першого замовлення зверніть увагу на{' '}
              {featuredProducts.map((product, index) => (
                <span key={product.id}>
                  <Link to={`/product/${product.slug ?? product.id}`} className="font-semibold underline underline-offset-4">
                    {product.name}
                  </Link>
                  {index < featuredProducts.length - 1 ? ', ' : '.'}
                </span>
              ))}{' '}
              Якщо потрібен більш шоколадний формат для гарячого напою, поверніться до{' '}
              <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">категорії какао бомбочок</Link>, а для готового
              подарунка перегляньте{' '}
              <Link to="/gift-sets" className="font-semibold underline underline-offset-4">набори ChocoPix</Link>.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#3D2616]">
            Поширені запитання про маршмелоу
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
