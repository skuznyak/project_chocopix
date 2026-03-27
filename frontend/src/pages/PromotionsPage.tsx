import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function PromotionsPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const promoProducts = products.filter((product) => product.badge === 'sale')

  return (
    <>
      <Helmet>
        <title>Акції на какао бомбочки та набори | ChocoPix</title>
        <meta
          name="description"
          content="Актуальні акції на какао бомбочки з маршмелоу та подарункові набори. Вигідні ціни, спеціальні пропозиції, доставка по Україні."
        />
        <meta property="og:title" content="Акції на какао бомбочки та набори | ChocoPix" />
        <meta
          property="og:description"
          content="Актуальні акції на какао бомбочки з маршмелоу та подарункові набори. Вигідні ціни, спеціальні пропозиції, доставка по Україні."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chocopix.store/promotions" />
        <meta property="og:image" content="https://chocopix.store/images/shares.webp" />
        <link rel="canonical" href="https://chocopix.store/promotions" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Акції</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-[#3D2616]">Спеціальні пропозиції</h1>
        <div className="mt-4 max-w-3xl space-y-4 text-[17px] leading-8 text-[#3D2616]">
          <p>
            На цій сторінці зібрані лише акційні пропозиції: знижки на окремі позиції, сезонні спецпропозиції та вигідні набори. Асортимент
            оновлюється, тому варто періодично перевіряти добірку.
          </p>
          <p>
            Якщо вам потрібен повний каталог без фільтра за знижками, перейдіть у{' '}
            <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">
              шоколадні бомбочки
            </Link>{' '}
            або{' '}
            <Link to="/gift-sets" className="font-semibold underline underline-offset-4">
              подарункові набори
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {promoProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
