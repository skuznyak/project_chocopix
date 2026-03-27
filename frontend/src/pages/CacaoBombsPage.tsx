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
  const cacaoBombs = products.filter((product) => product.tags.includes('бомбочки'))
  const featuredBombs = cacaoBombs.slice(0, 3)
  const categoryUrl = buildAbsoluteUrl('/cacao-bombs')
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Головна', path: '/' },
    { name: 'Шоколадні бомбочки', path: '/cacao-bombs' },
  ])
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
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
            шоколадні бомбочки з доставкою по Україні, обирайте позиції в каталозі ChocoPix і поєднуйте їх з{' '}
            <Link to="/gift-sets" className="font-semibold underline underline-offset-4">подарунковими наборами</Link> для свят, гостей і
            теплих домашніх моментів. А для додаткової солодкої текстури до чашки перегляньте{' '}
            <Link to="/marshmallow" className="font-semibold underline underline-offset-4">крафтове маршмелоу</Link>.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cacaoBombs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 space-y-4 text-[17px] leading-8 text-[#6f4a31]">
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
            Це бомбочки для гарячого шоколаду, які легко готувати вдома: вони підходять для молока, красиво розкриваються в чашці й допомагають
            швидко обрати смак під себе або на невеликий солодкий подарунок. Якщо хочеться зробити напій ще десертнішим, можна окремо{' '}
            <Link to="/marshmallow" className="font-semibold underline underline-offset-4">додати маршмелоу</Link>.
          </p>
        </div>

        <section className="mt-14 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#4c1d11]">
            Поширені запитання про какао бомбочки
          </h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-[24px] border border-[#eadfcb] bg-white/60 p-5">
                <summary className="cursor-pointer list-none font-semibold text-[#4c1d11]">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-cocoa-900/72">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
