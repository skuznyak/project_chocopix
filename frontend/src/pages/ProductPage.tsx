import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { useProduct, useProducts } from '@/hooks/useProducts'
import { useCartStore } from '@/store/cartStore'
import { animateAddToCart } from '@/utils/animateAddToCart'
import { formatPrice } from '@/utils/formatPrice'

export default function ProductPage() {
  const { slugOrId = '' } = useParams()
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
          <ProductGallery images={product.images} imageId={product.id} />
          <div>
            <h1 className="font-display text-5xl">{product.name} - какао бомбочка з маршмелоу</h1>
            <p className="mt-4 text-base text-cocoa-900/72">{product.description}</p>
            <p className="mt-4 text-base text-cocoa-900/72">
              Ця какао бомбочка з маршмелоу створена для затишних вечорів і смачних подарунків. Просто покладіть її в чашку, залийте гарячим
              молоком і спостерігайте, як шоколад розкривається та наповнює напій насиченим смаком. Формат зручний для дому, святкового столу
              або як приємний сюрприз близьким. Завдяки натуральним інгредієнтам і збалансованій солодкості напій виходить м&apos;яким, ароматним і
              справді десертним.
            </p>
            <p className="mt-3 text-base text-cocoa-900/72">
              {product.name} підійде тим, хто хоче швидко приготувати гарячий шоколад без складних рецептів. Достатньо однієї бомбочки, щоб
              перетворити звичайне молоко на ефектний напій з маршмелоу. Замовляйте з доставкою по Україні та обирайте улюблені смаки для себе,
              родини або подарункового набору.
            </p>
            <div className="mt-6 grid gap-3 rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4]/90 p-5 shadow-soft">
              <div className="flex justify-between"><span>Смак</span><span>{product.flavor}</span></div>
              <div className="flex justify-between"><span>Вага</span><span>{product.weight} г</span></div>
              <div className="flex justify-between"><span>Склад</span><span>{product.composition.join(', ')}</span></div>
            </div>
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
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-4xl">З цим також купують</h2>
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
