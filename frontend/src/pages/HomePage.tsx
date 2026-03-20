import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, CircleDashed, Gift, HandHeart, Leaf, Milk, Soup, Sparkles, Truck } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { CallbackModal } from '@/components/layout/CallbackModal'
import { useProducts } from '@/hooks/useProducts'
import { DEFAULT_OG_IMAGE, buildAbsoluteUrl } from '@/utils/seo'

const HeroBomb = lazy(() =>
  import('@/components/3d/HeroBomb').then((module) => ({ default: module.HeroBomb })),
)

const uspItems = [
  { icon: HandHeart, title: 'Ручна робота', text: 'Кожна бомбочка відливається вручну невеликими партіями.' },
  { icon: Leaf, title: 'Натуральний склад', text: 'Якісний шоколад, справжні смаки та мінімум зайвого.' },
  { icon: Truck, title: 'Доставка по Україні', text: 'Швидко відправляємо Новою Поштою по всій країні.' },
  { icon: Gift, title: 'Ідеальний подарунок', text: 'WOW-ефект у чашці та стильне пакування для свят.' },
]

const steps = [
  {
    icon: Milk,
    accent: 'from-[#fff9ef] to-[#f0dfc6]',
    text: 'Налий у чашку приблизно 250-300 мл гарячого молока.',
  },
  {
    icon: CircleDashed,
    accent: 'from-[#f6e4d0] to-[#e8c6a8]',
    text: 'Опусти шоколадну кульку й дай їй кілька секунд, щоб гарно розкритися.',
  },
  {
    icon: Sparkles,
    accent: 'from-[#f7ecd9] to-[#ebd0b1]',
    text: 'Легко перемішай напій, щоб смак став рівним і насиченим.',
  },
  {
    icon: Soup,
    accent: 'from-[#f2dec8] to-[#dfb992]',
    text: 'Смакуй тепле какао з ніжним маршмелоу та шоколадним ароматом.',
  },
]

const faqs = [
  { question: 'Як зберігати?', answer: 'У сухому прохолодному місці при температурі до 20°C.' },
  { question: 'Скільки зберігаються?', answer: 'До 2-х місяців.' },
  { question: 'Коли відправки?', answer: '1-3 дні. Виготовляємо щодня, щоб все було свіжим!' },
  { question: 'Чи можна змінити вміст набору?', answer: 'Готові набори не змінюються — тільки ті варіанти, що є на сайті. Але ви можете створити власний набір, обравши різні смаки бомбочок окремо.' },
  { question: 'Яка доставка?', answer: 'Нова Пошта, відділення, поштомат або курʼєр.' },
  { question: 'Як оплатити?', answer: 'Оплата при отриманні або на карту. При оплаті на карту — дешевша доставка.' },
  { question: 'Чи можна дітям?', answer: 'Так, але зважайте на індивідуальні алергії та вміст цукру.' },
]

export default function HomePage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const isServerRender = import.meta.env.SSR
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // Filter products by category
  const bombochkyProducts = products
    .filter((p) => p.tags.includes('бомбочки'))
    .sort((a, b) => {
      const aIsHeart = a.images[0]?.src?.includes('/products/heart_') ? 1 : 0
      const bIsHeart = b.images[0]?.src?.includes('/products/heart_') ? 1 : 0

      return aIsHeart - bIsHeart
    })
  const giftSetProducts = products.filter((p) => p.tags.includes('набори'))
  const promoProducts = products.filter((p) => p.badge === 'sale')
  const mobileHero = isServerRender ? (
    <div className="h-[430px] w-full rounded-[32px] bg-[#f1e3ce]" />
  ) : (
    <Suspense fallback={<div className="h-[430px] w-full rounded-[32px] bg-[#f1e3ce]" />}>
      <HeroBomb />
    </Suspense>
  )
  const desktopHero = isServerRender ? (
    <div className="h-[620px] w-full rounded-[42px] bg-[#f1e3ce]" />
  ) : (
    <Suspense fallback={<div className="h-[620px] w-full rounded-[42px] bg-[#f1e3ce]" />}>
      <HeroBomb />
    </Suspense>
  )

  return (
    <>
      <Helmet>
        <title>Шоколадні бомбочки з маршмелоу — ChocoPix</title>
        <meta
          name="description"
          content="Купити шоколадні бомбочки та какао бомбочки з маршмелоу. Ручна робота, подарункові набори та доставка по Україні."
        />
        <meta property="og:title" content="Шоколадні бомбочки з маршмелоу — ChocoPix" />
        <meta
          property="og:description"
          content="Купити шоколадні бомбочки та какао бомбочки з маршмелоу. Ручна робота, подарункові набори та доставка по Україні."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={buildAbsoluteUrl('/')} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content="Шоколадні бомбочки та какао бомбочки з маршмелоу ChocoPix" />
        <link rel="canonical" href={buildAbsoluteUrl('/')} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid gap-10 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-14">
          <div>
            <div className="inline-flex rounded-full bg-[#ead7b8] px-6 py-2.5 text-base font-semibold uppercase tracking-[0.22em] text-[#9a6435]">
              Новинка 2026
            </div>
            <h1 className="mt-8 max-w-2xl font-display text-[78px] font-semibold leading-[0.82] tracking-[-0.05em] text-[#4c1d11] sm:text-[96px] xl:text-[108px]">
              Какао
              <br />
              <span className="font-script text-[#d29b60] italic">бомбочки з маршмелоу</span>
            </h1>
            <div className="mt-6 lg:hidden">
              {mobileHero}
            </div>
            <p className="mt-8 max-w-xl text-[19px] leading-10 text-[#8a5d3c]">
              Відчуйте справжній вибух смаку! Просто покладіть шоколадну бомбочку в чашку, залийте гарячим молоком і спостерігайте, як народжується диво.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#bombочки">
                <Button className="min-h-16 rounded-[22px] bg-[#8c5328] px-9 text-[19px] font-extrabold shadow-[0_18px_40px_rgba(91,28,2,0.18)] hover:bg-[#74411f]">
                  Спробувати зараз <ArrowRight className="ml-3" size={22} />
                </Button>
              </a>
              <Button
                variant="ghost"
                onClick={() => setIsCallbackOpen(true)}
                className="flex min-h-16 items-center gap-2 rounded-[22px] border border-[#a4693f] bg-transparent px-9 text-[19px] font-extrabold text-[#c78f59] transition hover:bg-[#EAD7B8] hover:text-[#c78f59]"
              >
                Хочу солодкого
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            {desktopHero}
          </div>
        </section>

        {/* Category Navigation Blocks */}
        <section className="py-8">
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              className="group relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(92,55,28,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(92,55,28,0.2)]"
              initial={{ opacity: 0.7, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Link to="/cacao-bombs" className="absolute inset-0 z-10" aria-label="Перейти до категорії шоколадних бомбочок" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
              <img
                src="/images/107270_001.webp"
                alt="Шоколадні бомбочки з маршмелоу ChocoPix"
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-[32px] bg-black/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-3xl font-semibold text-white">Бомбочки</h3>
                <p className="mt-2 text-sm text-white">Шоколадні бомбочки з маршмелоу</p>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(92,55,28,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(92,55,28,0.2)]"
              initial={{ opacity: 0.7, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <Link to="/gift-sets" className="absolute inset-0 z-10" aria-label="Перейти до категорії подарункових наборів" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
              <img
                src="/images/photo_2024-11-12_01-.webp"
                alt="Подарункові набори шоколадних бомбочок ChocoPix"
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-[32px] bg-black/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-3xl font-semibold text-white">Набори</h3>
                <p className="mt-2 text-sm text-white">Подарункові набори</p>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(92,55,28,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(92,55,28,0.2)]"
              initial={{ opacity: 0.7, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <Link to="/promotions" className="absolute inset-0 z-10" aria-label="Перейти до сторінки акцій" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
              <img
                src="/images/shares.webp"
                alt="Акції на шоколадні бомбочки ChocoPix"
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-[32px] bg-black/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-3xl font-semibold text-white">Акції</h3>
                <p className="mt-2 text-sm text-white">Вигідні пропозиції</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="grid gap-4 py-10 md:grid-cols-2 xl:grid-cols-4">
          {uspItems.map((item, index) => (
            <motion.article
              key={item.title}
              className="rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 shadow-[0_18px_40px_rgba(92,55,28,0.05)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <item.icon size={30} className="text-[#c78f59]" />
              <h2 className="mt-4 font-display text-[2.05rem] font-semibold leading-[1.08] text-[#4c1d11]">{item.title}</h2>
              <p className="mt-3 text-base text-[#805339]">{item.text}</p>
            </motion.article>
          ))}
        </section>

        {/* Бомбочки Catalog Section */}
        <section id="bombочки" className="scroll-mt-24 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Каталог</p>
              <h2 className="mt-3 font-display text-6xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Бомбочки</h2>
              <p className="mt-3 max-w-xl text-lg text-[#8a5d3c]">
                Шоколадні бомбочки з маршмелоу — вибух смаку у вашій чашці. Просто киньте в гаряче молоко і насолоджуйтесь!
              </p>
            </div>
            <a href="#набори" className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-cocoa-900/70 transition hover:text-cocoa-900 lg:block">
              До наборів →
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {bombochkyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Набори Catalog Section */}
        <section id="набори" className="scroll-mt-24 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Подарунки</p>
              <h2 className="mt-3 font-display text-6xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Набори</h2>
              <p className="mt-3 max-w-xl text-lg text-[#8a5d3c]">
                Готові подарункові набори з кількох смаків. Чудовий вибір для свята або щоб порадувати близьких.
              </p>
            </div>
            <a href="#акції" className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-cocoa-900/70 transition hover:text-cocoa-900 lg:block">
              До акцій →
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {giftSetProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Акції Catalog Section */}
        <section id="акції" className="scroll-mt-24 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Аксесуари</p>
              <h2 className="mt-3 font-display text-6xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Акції</h2>
              <p className="mt-3 max-w-xl text-lg text-[#8a5d3c]">
                Спеціальні пропозиції, знижки та вигідні добірки для ваших улюблених смаків. Обирайте найкращу акцію для себе.
              </p>
            </div>
            <a href="#how-it-works" className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-cocoa-900/70 transition hover:text-cocoa-900 lg:block">
              Як це працює →
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="rounded-[30px] bg-gradient-to-b from-[#fff9ef] via-[#f7ead6] to-[#efdbc2] p-7 shadow-[0_16px_36px_rgba(90,53,25,0.09)] sm:p-10">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-[#4c1d11] sm:text-5xl">
            Какао бомбочки з маршмелоу — ідеальний подарунок та затишок вдома
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-8 text-[#6f4a31]">
            <p>
              Какао бомбочки з маршмелоу давно стали улюбленим ритуалом для холодного сезону та приємних домашніх вечорів. Коли шоколадна сфера
              потрапляє в гаряче молоко, вона поступово розкривається, а всередині з&apos;являються ніжні маршмелоу і насичений какао-аромат. Саме
              тому цей формат напою так люблять і діти, і дорослі: він поєднує смак, ефектну подачу та відчуття затишку в кожній чашці.
            </p>
            <p>
              У ChocoPix ви можете купити какао бомбочки з маршмелоу ручної роботи з доставкою по Україні. Ми готуємо шоколадні бомбочки
              невеликими партіями, щоб зберегти стабільну якість і свіжість. Це вдалий вибір для подарунка близьким, для святкового столу або
              просто для моменту, коли хочеться чогось теплого, солодкого і красивого без складного приготування.
            </p>
          </div>

          <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.02em] text-[#4c1d11]">
            Чому варто обрати наші какао бомбочки?
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[17px] leading-8 text-[#6f4a31] marker:text-[#9f6638]">
            <li>Натуральний шоколад високої якості з приємним збалансованим смаком.</li>
            <li>Ніжні маршмелоу всередині, які красиво розкриваються у гарячому молоці.</li>
            <li>Формат, що ідеально підходить для подарунка та створює WOW-ефект.</li>
            <li>Швидка доставка по Україні та акуратне пакування замовлення.</li>
          </ul>
          <p className="mt-6 text-[17px] leading-8 text-[#6f4a31]">
            Перейдіть у <Link to="/cacao-bombs" className="font-semibold underline underline-offset-4">категорію шоколадних бомбочок</Link>, щоб обрати окремі смаки, або перегляньте
            <Link to="/gift-sets" className="ml-1 font-semibold underline underline-offset-4">подарункові набори</Link> для свят і замовлень з доставкою по Україні.
          </p>

        </section>

        <section id="how-it-works" className="py-12">
          <div className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(180deg,#f8f1e4_0%,#f4ead9_100%)] px-5 py-10 shadow-[0_28px_70px_rgba(92,55,28,0.09)] sm:px-8 lg:px-12">
            <div className="absolute inset-x-10 top-0 h-32 bg-[radial-gradient(circle,_rgba(255,255,255,0.5)_0%,_rgba(255,255,255,0)_72%)]" />
            <div className="absolute right-[-40px] top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(222,187,149,0.32)_0%,_rgba(222,187,149,0)_70%)] blur-2xl" />
            <div className="absolute bottom-[-28px] left-12 h-32 w-56 rounded-full bg-[radial-gradient(circle,_rgba(196,147,103,0.22)_0%,_rgba(196,147,103,0)_72%)] blur-2xl" />
            <div className="relative">
              <h2 className="text-center font-display text-[38px] font-semibold leading-[0.98] tracking-[-0.05em] text-[#56392c] sm:text-[46px] lg:text-[52px]">
                Інструкція
                <br />
                приготування
              </h2>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {steps.map((step, index) => (
                  <motion.article
                    key={step.text}
                    className="relative overflow-hidden rounded-[28px] border border-white/40 bg-[#efdfcb] px-5 py-5 text-[#5c4336] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_30px_rgba(92,55,28,0.06)]"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className={`absolute right-[-16px] top-[-16px] h-24 w-24 rounded-full bg-gradient-to-br ${step.accent} opacity-90 blur-[1px]`} />
                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-white/65 shadow-[0_8px_20px_rgba(92,55,28,0.08)]">
                        <step.icon size={22} className="text-[#8b5c3c]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9f7357]">Крок {index + 1}</p>
                        <p className="mt-1.5 text-base leading-[1.25] tracking-[-0.02em] sm:text-lg">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">FAQ</p>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[24px] border border-[#eadfcb] bg-[#f8f1e4] p-5 shadow-[0_18px_40px_rgba(92,55,28,0.05)]">
                <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                <p className="mt-3 text-sm text-cocoa-900/72">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </>
  )
}
