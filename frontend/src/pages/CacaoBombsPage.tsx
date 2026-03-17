import { Helmet } from 'react-helmet-async'
import { ProductCard } from '@/components/product/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function CacaoBombsPage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const cacaoBombs = products.filter((product) => product.tags.includes('бомбочки'))

  return (
    <>
      <Helmet>
        <title>Какао бомбочки з маршмелоу купити в Україні | ChocoPix</title>
        <meta
          name="description"
          content="Какао бомбочки з маршмелоу купити онлайн в Україні. Ручна робота, натуральний шоколад, швидка доставка та великий вибір смаків."
        />
        <meta property="og:title" content="Какао бомбочки з маршмелоу купити в Україні | ChocoPix" />
        <meta
          property="og:description"
          content="Какао бомбочки з маршмелоу купити онлайн в Україні. Ручна робота, натуральний шоколад, швидка доставка та великий вибір смаків."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chocopix.store/cacao-bombs" />
        <meta property="og:image" content="https://chocopix.store/images/107270_001.webp" />
        <link rel="canonical" href="https://chocopix.store/cacao-bombs" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Категорія</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Какао бомбочки з маршмелоу</h1>
        <div className="mt-6 space-y-4 text-[17px] leading-8 text-[#6f4a31]">
          <p>
            Какао бомбочки з маршмелоу - це смачний і ефектний спосіб приготувати гарячий шоколад вдома. Шоколадна сфера розкривається у гарячому
            молоці, наповнює чашку ароматом какао та додає ніжні маршмелоу. Такий формат чудово підходить для затишного вечора, частування гостей
            або подарунка для близьких.
          </p>
          <p>
            У цій категорії зібрані шоколадні бомбочки з різними смаками: від класичних до більш насичених і десертних. Усі позиції зручні у
            приготуванні: достатньо покласти бомбочку в чашку і залити гарячим молоком. Через кілька секунд ви отримуєте густий, ароматний напій
            з приємною солодкістю. Це вдалий варіант для дітей і дорослих, коли хочеться швидко створити момент комфорту.
          </p>
          <p>
            Якщо ви хочете купити какао бомбочки з маршмелоу в Україні, обирайте смаки в каталозі ChocoPix. Ми готуємо продукцію невеликими
            партіями, дбаємо про якість інгредієнтів та пакування, а також швидко відправляємо замовлення по країні. Замовляйте окремі позиції або
            поєднуйте їх у подарункові сети для свят, родинних зустрічей і теплих домашніх вечорів.
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
