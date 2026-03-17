import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { useProduct, useProducts } from '@/hooks/useProducts'
import { useCartStore } from '@/store/cartStore'
import { animateAddToCart } from '@/utils/animateAddToCart'
import { formatPrice } from '@/utils/formatPrice'

export default function ProductPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data: product } = useProduct(id)
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const addItem = useCartStore((state) => state.addItem)
  const closeCart = useCartStore((state) => state.closeCart)

  if (!product) {
    return <div className="mx-auto max-w-7xl px-4 py-20">Товар не знайдено.</div>
  }

  const similarProducts = products
    .filter((item) => item.id !== product.id)
    .filter((item) => item.id !== 'classic-mug')
    .filter((item) => item.tags.includes('набори') || item.badge === 'sale')
    .slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{product.name} — купити з доставкою</title>
        <meta name="description" content={`${product.shortDescription}. Ціна ${product.price} грн. Доставка Новою Поштою.`} />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-sm text-cocoa-900/55">
          <Link to="/">Головна</Link> / <span>Каталог</span> / <span>{product.name}</span>
        </div>
        <section className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <ProductGallery images={product.images} imageId={product.id} />
          <div>
            <h1 className="font-display text-5xl">{product.name}</h1>
            <p className="mt-4 text-base text-cocoa-900/72">{product.description}</p>
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
