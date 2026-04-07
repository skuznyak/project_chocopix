import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Clock3, Leaf, Scale, ShieldAlert, Thermometer } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import type { Product } from '@chocopix/shared'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { useProduct, useProducts } from '@/hooks/useProducts'
import { useCartStore } from '@/store/cartStore'
import { animateAddToCart } from '@/utils/animateAddToCart'
import { formatPrice } from '@/utils/formatPrice'
import { trackMetaAddToCart } from '@/utils/metaPixel'
import { buildAbsoluteUrl, buildBreadcrumbSchema, buildProductSchema, toAbsoluteImageUrl } from '@/utils/seo'

type DetectedProductType = 'cacao-bomb' | 'gift-set' | 'cup' | 'marshmallow'

const marshmallowBaseComposition = ['цукор', 'глюкозний сироп / інвертний сироп', 'желатин', 'вода']
const marshmallowAdditionalComposition = [
  'ваніль / фруктові / карамельні ароматизатори',
  'барвники',
  'цукрова пудра',
  'крохмаль',
]

const detectProductType = (item: Pick<Product, 'slug' | 'name' | 'category'>): DetectedProductType => {
  if (item.category === 'gift-set') {
    return 'gift-set'
  }

  if (item.category === 'cups') {
    return 'cup'
  }

  if (item.category === 'marshmallow') {
    return 'marshmallow'
  }

  const rawSource = `${item.slug} ${item.name}`.toLowerCase()
  const source = rawSource.replace(/\bsale\b/g, ' ')

  if (/\bcup\b|чашк/.test(source)) {
    return 'cup'
  }

  if (/\bset\b|набір|набор/.test(source)) {
    return 'gift-set'
  }

  return 'cacao-bomb'
}

const pickRelatedProducts = (current: Product, catalog: Product[], type: DetectedProductType) => {
  const otherProducts = catalog.filter((entry) => entry.id !== current.id)
  const bombs = otherProducts.filter((entry) => detectProductType(entry) === 'cacao-bomb')
  const giftSets = otherProducts.filter((entry) => detectProductType(entry) === 'gift-set')
  const cups = otherProducts.filter((entry) => detectProductType(entry) === 'cup')
  const marshmallows = otherProducts.filter((entry) => detectProductType(entry) === 'marshmallow')
  const mergeUnique = (primary: Product[], fallback: Product[]) => {
    const merged: Product[] = []
    const seen = new Set<string>()

    for (const item of [...primary, ...fallback]) {
      if (seen.has(item.id)) {
        continue
      }

      seen.add(item.id)
      merged.push(item)
    }

    return merged.slice(0, 3)
  }

  if (type === 'cacao-bomb') {
    return mergeUnique([...bombs.slice(0, 2), ...giftSets.slice(0, 1)], otherProducts)
  }

  if (type === 'gift-set') {
    return mergeUnique([...bombs.slice(0, 2), ...giftSets.slice(0, 1)], otherProducts)
  }

  if (type === 'marshmallow') {
    return mergeUnique([...marshmallows.slice(0, 2), ...bombs.slice(0, 1)], otherProducts)
  }

  return mergeUnique([...cups.slice(0, 2), ...bombs.slice(0, 1)], otherProducts)
}

export default function ProductPage() {
  const { slugOrId = '' } = useParams()
  const [expandedCharacteristic, setExpandedCharacteristic] = useState<string | null>(null)
  const navigate = useNavigate()
  const { data: product } = useProduct(slugOrId)
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const addItem = useCartStore((state) => state.addItem)
  const closeCart = useCartStore((state) => state.closeCart)

  if (!product) {
    return <div className="mx-auto max-w-7xl px-4 py-20">Товар не знайдено.</div>
  }

  const canonicalSlug = product.slug ?? product.id

  if (slugOrId !== canonicalSlug) {
    return <Navigate to={`/product/${canonicalSlug}`} replace />
  }

  const productType = detectProductType(product)
  const similarProducts = pickRelatedProducts(product, products, productType)

  const seoH1 =
    productType === 'gift-set'
      ? `Подарунковий набір ${product.name}`
      : productType === 'marshmallow'
        ? `Авторське маршмелоу ${product.name}`
      : productType === 'cup'
        ? `Чашка ${product.name}`
        : `Какао бомбочка з маршмелоу ${product.name}`

  const seoTitle =
    productType === 'gift-set'
      ? `Подарунковий набір какао бомбочок ${product.name} купити | ChocoPix`
      : productType === 'marshmallow'
        ? `Маршмелоу ${product.name} купити | Крафтове маршмелоу | ChocoPix`
      : productType === 'cup'
        ? `Чашка ${product.name} купити | ChocoPix`
        : `Какао бомбочка ${product.name} купити | Шоколадна бомбочка з маршмелоу | ChocoPix`

  const seoDescription =
    productType === 'gift-set'
      ? `Подарунковий набір какао бомбочок ${product.name} купити для подарунка, свята або сімейного вечора. Доставка по Україні від ChocoPix.`
      : productType === 'marshmallow'
        ? `Маршмелоу ${product.name} ручної роботи купити для какао, десертів і подарунка. Крафтове маршмелоу з доставкою по Україні.`
      : productType === 'cup'
        ? `Чашка ${product.name} для щоденного використання: зручна подача гарячих напоїв, естетичний дизайн і комфортна сервіровка.`
        : `Какао бомбочка ${product.name} з маршмелоу для гарячого шоколаду. Купити шоколадну бомбочку з доставкою по Україні від ChocoPix.`
  const robotsContent = productType === 'cup' ? 'noindex,follow' : 'index,follow'

  const seoContentBlocks =
    productType === 'gift-set'
      ? [
          `${product.name} створений як готовий подарунковий сценарій: стильна подача, продуманий набір смаків і відчуття турботи з першого відкриття коробки. Такий формат зручно дарувати на день народження, свята, корпоративні події або як приємний жест без приводу.`,
          `Смакова добірка набору: ${product.flavor.toLowerCase()} (${product.composition.join(', ')}). Замовляйте набір із доставкою по Україні, щоб швидко підготувати доречний подарунок для близьких, друзів або колег.`,
        ]
      : productType === 'marshmallow'
        ? [
            `${product.name} - це окремий десертний формат ChocoPix: мʼяке авторське маршмелоу з виразним смаком, який доречно виглядає в подарунковій коробці, на святковому столі або як солодкий комплімент до гарячих напоїв.`,
            `Смаковий профіль ${product.name.toLowerCase()}: ${product.flavor.toLowerCase()} з нотами ${product.composition.slice(0, 3).join(', ')}. Обирайте цю позицію для себе або перегляньте інші варіанти в категорії маршмелоу.`,
          ]
        : productType === 'cup'
        ? [
            `${product.name} розрахована на щоденне використання: зручно тримати в руці, комфортно подавати гарячі напої та легко поєднувати з домашньою чи святковою сервіровкою. Формат підходить для какао, кави та чаю.`,
            `Акуратний дизайн чашки додає естетики подачі та робить ритуал напою приємнішим. Обирайте модель для себе або як практичний подарунок, щоб підкреслити стиль кухні чи робочого простору.`,
          ]
        : [
            `Ця какао бомбочка з маршмелоу створена для затишного ритуалу гарячого шоколаду. Просто покладіть її в чашку, залийте гарячим молоком і спостерігайте, як шоколад розкривається та наповнює напій насиченим смаком.`,
            `Смаковий профіль ${product.name.toLowerCase()}: ${product.flavor.toLowerCase()} з нотами ${product.composition.slice(0, 3).join(', ')}. Замовляйте з доставкою по Україні та обирайте улюблені смаки для себе, родини або подарункового формату.`,
          ]

  const categoryPath =
    productType === 'gift-set' ? '/gift-sets' : productType === 'marshmallow' ? '/marshmallow' : '/cacao-bombs'
  const categoryLabel =
    productType === 'gift-set' ? 'Подарункові набори' : productType === 'marshmallow' ? 'Маршмелоу' : productType === 'cup' ? 'Каталог ChocoPix' : 'Шоколадні бомбочки'
  const productUrl = buildAbsoluteUrl(`/product/${canonicalSlug}`)
  const primaryImageUrl = product.images[0]?.src
    ? toAbsoluteImageUrl(product.images[0].src)
    : toAbsoluteImageUrl()
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Головна', path: '/' },
    { name: categoryLabel, path: categoryPath },
    { name: product.name, path: `/product/${canonicalSlug}` },
  ])
  const productSchema = buildProductSchema({
    name: product.name,
    description: seoDescription,
    url: productUrl,
    image: product.images.map((image) => toAbsoluteImageUrl(image.src)),
    sku: product.id,
    category: categoryLabel,
    price: product.price,
  })
  const compositionValue =
    productType === 'marshmallow'
      ? [
          `Основа: ${marshmallowBaseComposition.join(', ')}`,
          `Смак / добавки: ${product.composition.join(', ')}`,
          `Додатково: ${marshmallowAdditionalComposition.join(', ')}`,
        ].join('\n')
      : product.composition.join(', ')
  const freshnessText =
    productType === 'marshmallow'
      ? 'Ми виготовляємо маршмелоу після вашого замовлення, тому відправка здійснюється протягом 1-2 днів.'
      : 'Ми виготовляємо какао бомбочки після вашого замовлення, тому відправка здійснюється протягом 1-2 днів.'

  const characteristics = [
    ...(productType !== 'cup'
      ? [
          {
            key: 'weight',
            label: productType === 'marshmallow' ? 'Розмір кусочка' : productType === 'gift-set' ? 'Вага набору' : 'Вага порції',
            value: productType === 'marshmallow' ? 'приблизно 50х50х50мм' : productType === 'gift-set' ? `~${product.weight} г` : '~30 г',
            details:
              productType === 'marshmallow'
                ? 'Форма й розмір можуть трохи відрізнятися залежно від партії, але орієнтир для одного шматочка саме такий.'
                : productType === 'gift-set'
                ? 'Фактична вага набору може мати незначне технологічне відхилення.'
                : 'Фактична вага порції може мати незначне технологічне відхилення.',
            Icon: Scale,
          },
        ]
      : []),
    {
      key: 'shelf-life',
      label: 'Термін зберігання',
      value: productType === 'marshmallow' ? 'до 3 місяців' : '2 міс',
      details:
        productType === 'marshmallow'
          ? 'За умови дотримання температурного режиму та герметичного пакування маршмелоу можна зберігати до 3 місяців.'
          : 'Рекомендований термін за умови дотримання температурного режиму та герметичного пакування.',
      Icon: Clock3,
    },
    {
      key: 'storage',
      label: 'Умови зберігання',
      value: '18±3°C',
      details: 'Зберігайте у сухому місці, без прямих сонячних променів і різких перепадів температури.',
      Icon: Thermometer,
    },
    {
      key: 'composition',
      label: 'Склад',
      value: compositionValue,
      details:
        productType === 'marshmallow'
          ? [
              'Цукор дає солодкість і структуру.',
              'Глюкозний або інвертний сироп не дає цукру кристалізуватись і робить текстуру тягучою.',
              'Желатин формує пружний каркас.',
              'Вода потрібна для сиропу та набухання желатину.',
              'Цукрова пудра та крохмаль допомагають, щоб маршмелоу не липло.',
            ].join('\n')
          : 'Склад може трохи відрізнятися залежно від партії та обраного смаку.',
      Icon: Leaf,
    },
    {
      key: 'allergens',
      label: 'Алергени',
      value: 'Можливі сліди арахісу, інших горіхів, лактози, прянощів і глютену.',
      details: 'Якщо маєте харчові обмеження, перевіряйте склад перед вживанням.',
      Icon: ShieldAlert,
    },
  ]

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content={robotsContent} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <meta property="og:image" content={primaryImageUrl} />
        <meta property="og:image:alt" content={product.images[0]?.alt || seoH1} />
        <link rel="canonical" href={productUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="breadcrumb" className="text-sm text-cocoa-900/55">
          <Link to="/">Головна</Link> / <Link to={categoryPath}>{categoryLabel}</Link> / <span>{product.name}</span>
        </nav>
        <section className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mx-auto w-full max-w-[640px] lg:max-w-[560px]">
              <ProductGallery images={product.images} imageId={product.id} productName={product.name} />
            </div>
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl">{seoH1}</h1>
            <p className="mt-4 text-base text-cocoa-900/72">{product.description}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-3xl font-semibold">{formatPrice(product.price)}</p>
              {productType === 'marshmallow' ? (
                <p className="text-right text-sm font-medium uppercase tracking-[0.12em] text-[#d97aa6]">За упаковку (3шт)</p>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  animateAddToCart(
                    document.querySelector<HTMLElement>(`[data-product-image-id="${product.id}"]`),
                  )
                  addItem(product.id)
                  trackMetaAddToCart(product)
                }}
              >
                Додати в кошик
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  closeCart()
                  addItem(product.id)
                  trackMetaAddToCart(product)
                  navigate('/checkout')
                }}
              >
                Купити зараз
              </Button>
            </div>
            <div className="mt-6 rounded-[20px] border border-[#eadfcb] bg-[#f8f1e4]/75 p-4 text-sm leading-6 text-[#5f3925]">
              <p className="font-semibold tracking-[-0.01em] text-[#3D2616]">✨ Свіжість має значення</p>
              <p className="mt-1">{freshnessText}</p>
            </div>
            <div className="mt-6 w-full max-w-[460px] rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4]/90 p-4 shadow-soft">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#3D2616]">Характеристики товару</h2>
              <div className="mt-3 space-y-2 text-sm text-[#5f3925]">
                {characteristics.map((item) => {
                  const isExpanded = expandedCharacteristic === item.key
                  const Icon = item.Icon

                  return (
                    <div key={item.key} className="rounded-xl bg-white/55 px-3.5 py-2.5">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`Детальніше про ${item.label}`}
                        className="flex w-full items-center gap-2 text-left font-medium"
                        onClick={() => {
                          setExpandedCharacteristic((prev) => (prev === item.key ? null : item.key))
                        }}
                      >
                        {Icon ? <Icon size={18} className="text-[#8c5328]" /> : null}
                        <span>{item.label}</span>
                        <span className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#cfae8f] text-xl font-semibold leading-none text-[#7a4b2c] transition hover:bg-[#f3e6d3]">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>
                      {isExpanded ? (
                        <div className="mt-2 space-y-1 text-xs leading-5 text-[#7a6050]">
                          <p className="whitespace-pre-line font-medium text-[#3D2616]">{item.value}</p>
                          <p className="whitespace-pre-line">{item.details}</p>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 w-full rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 text-cocoa-900/72 shadow-soft sm:p-8">
          <div className="space-y-4 text-base leading-8">
            {seoContentBlocks.map((content) => (
              <p key={content}>{content}</p>
            ))}
          </div>
          <p className="mt-4 text-base leading-8">
            Перегляньте також <Link to={categoryPath} className="font-semibold underline underline-offset-4">{categoryLabel.toLowerCase()}</Link>, щоб обрати інші смаки та формати з цієї категорії.
            {productType === 'gift-set'
              ? (
                  <>
                    {' '}Якщо потрібні окремі позиції, дивіться{' '}
                    <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">какао бомбочки з маршмелоу</Link>.
                  </>
                )
              : productType === 'marshmallow'
                ? (
                    <>
                      {' '}Для поєднання з гарячим шоколадом перегляньте також{' '}
                      <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">какао бомбочки</Link>.
                    </>
                  )
              : productType === 'cacao-bomb'
                ? (
                    <>
                      {' '}Для подарункового формату перейдіть у{' '}
                      <Link to="/gift-sets" className="font-semibold underline underline-offset-4">набори</Link>. Якщо хочете більше начинки до гарячого какао, окремо перегляньте{' '}
                      <Link to="/marshmallow" className="font-semibold underline underline-offset-4">маршмелоу для какао</Link>.
                    </>
                  )
              : null}
            {productType === 'gift-set'
              ? (
                  <>
                    {' '}До такого набору також пасує{' '}
                    <Link to="/marshmallow" className="font-semibold underline underline-offset-4">авторське маршмелоу</Link>.
                  </>
                )
              : null}
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">З цим товаром також купують</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {similarProducts.map((entry) => (
              <ProductCard key={entry.id} product={entry} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
