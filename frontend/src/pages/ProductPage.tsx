import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Clock3, Leaf, Scale, ShieldAlert, Thermometer } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { useProduct, useProducts } from '@/hooks/useProducts'
import { useCartStore } from '@/store/cartStore'
import { animateAddToCart } from '@/utils/animateAddToCart'
import { formatPrice } from '@/utils/formatPrice'
import { formatProductWeight } from '@/utils/formatProductWeight'

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

  const similarProducts = products
    .filter((item) => item.id !== product.id)
    .filter((item) => item.id !== 'classic-mug')
    .filter((item) => item.tags.includes('набори') || item.badge === 'sale')
    .slice(0, 3)
  const productUrl = `https://chocopix.store/product/${canonicalSlug}`
  const seoTitle = `Какао бомбочка з маршмелоу ${product.name} купити | ChocoPix`
  const seoDescription = `Какао бомбочка з маршмелоу ${product.name}. Ідеальний подарунок та смачний гарячий шоколад. Доставка по Україні.`
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((image) => `https://chocopix.store${image.src}`),
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'ChocoPix',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'UAH',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }
  const characteristics = [
    {
      key: 'weight',
      label: 'Вага',
      value: formatProductWeight(product),
      details: 'Фактична вага порції може мати незначне технологічне відхилення.',
      Icon: Scale,
    },
    {
      key: 'shelf-life',
      label: 'Термін зберігання',
      value: '2 міс',
      details: 'Рекомендований термін за умови дотримання температурного режиму та герметичного пакування.',
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
      value: product.composition.join(', '),
      details: 'Склад може трохи відрізнятися залежно від партії та обраного смаку.',
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
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <meta property="og:image" content={`https://chocopix.store${product.images[0]?.src ?? ''}`} />
        <link rel="canonical" href={productUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-sm text-cocoa-900/55">
          <Link to="/">Головна</Link> / <span>Каталог</span> / <span>{product.name}</span>
        </div>
        <section className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mx-auto w-full max-w-[640px] lg:max-w-[560px]">
              <ProductGallery images={product.images} imageId={product.id} />
            </div>
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl">{product.name} - какао бомбочка з маршмелоу</h1>
            <p className="mt-4 text-base text-cocoa-900/72">{product.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-3xl font-semibold">{formatPrice(product.price)}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  animateAddToCart(
                    document.querySelector<HTMLElement>(`[data-product-image-id="${product.id}"]`),
                  )
                  addItem(product.id)
                }}
              >
                Додати в кошик
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  closeCart()
                  addItem(product.id)
                  navigate('/checkout')
                }}
              >
                Купити зараз
              </Button>
            </div>
            <div className="mt-6 w-full max-w-[460px] rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4]/90 p-4 shadow-soft">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#4c1d11]">Характеристики</h2>
              <div className="mt-3 space-y-2 text-sm text-[#5f3925]">
                {characteristics.map((item) => {
                  const isExpanded = expandedCharacteristic === item.key
                  const Icon = item.Icon

                  return (
                    <div key={item.key} className="rounded-xl bg-white/55 px-3.5 py-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 font-medium">
                          {Icon ? <Icon size={18} className="text-[#8c5328]" /> : null}
                          <span>{item.label}</span>
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-label={`Детальніше про ${item.label}`}
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#cfae8f] text-base font-semibold leading-none text-[#7a4b2c] transition hover:bg-[#f3e6d3]"
                            onClick={() => {
                              setExpandedCharacteristic((prev) => (prev === item.key ? null : item.key))
                            }}
                          >
                            {isExpanded ? '−' : '+'}
                          </button>
                        </div>
                      </div>
                      {isExpanded ? (
                        <div className="mt-2 space-y-1 text-xs leading-5 text-[#7a6050]">
                          <p className="font-medium text-[#6f4a31]">{item.value}</p>
                          <p>{item.details}</p>
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
            <p>
              Ця какао бомбочка з маршмелоу створена для затишних вечорів і смачних подарунків. Просто покладіть її в чашку, залийте гарячим
              молоком і спостерігайте, як шоколад розкривається та наповнює напій насиченим смаком. Формат зручний для дому, святкового столу
              або як приємний сюрприз близьким. Завдяки натуральним інгредієнтам і збалансованій солодкості напій виходить м&apos;яким, ароматним і
              справді десертним.
            </p>
            <p>
              {product.name} підійде тим, хто хоче швидко приготувати гарячий шоколад без складних рецептів. Достатньо однієї бомбочки, щоб
              перетворити звичайне молоко на ефектний напій з маршмелоу. Замовляйте з доставкою по Україні та обирайте улюблені смаки для себе,
              родини або подарункового набору.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">З цим також купують</h2>
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
