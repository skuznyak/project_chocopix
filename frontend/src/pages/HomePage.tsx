import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, CircleDashed, Gift, HandHeart, Leaf, Milk, Soup, Sparkles, Truck } from 'lucide-react'
import { useState } from 'react'
import { HeroBomb } from '@/components/3d/HeroBomb'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { CallbackModal } from '@/components/layout/CallbackModal'
import { useProducts } from '@/hooks/useProducts'

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

const reviews = [
  { name: 'Марина', text: 'Подарувала набір колегам, усі в захваті від ефекту та смаку.' },
  { name: 'Олена', text: 'Діти просять ще, а пакування виглядає дуже преміально.' },
  { name: 'Ірина', text: 'Швидка доставка і справді натуральний смак без зайвої солодкості.' },
]

const faqs = [
  { question: 'Як зберігати?', answer: 'У сухому прохолодному місці при температурі до 20°C.' },
  { question: 'Скільки зберігаються?', answer: 'До 6-ти тижнів.' },
  { question: 'Коли відправки?', answer: '1-3 дні. Виготовляємо щодня, щоб все було свіжим!' },
  { question: 'Чи можна змінити вміст набору?', answer: 'Готові набори не змінюються — тільки ті варіанти, що є на сайті. Але ви можете створити власний набір, обравши різні смаки бомбочок окремо.' },
  { question: 'Яка доставка?', answer: 'Нова Пошта, відділення, поштомат або курʼєр.' },
  { question: 'Як оплатити?', answer: 'Оплата при отриманні або на карту. При оплаті на карту — дешевша доставка.' },
  { question: 'Чи можна дітям?', answer: 'Так, але зважайте на індивідуальні алергії та вміст цукру.' },
]

export default function HomePage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  // Filter products by category
  const bombochkyProducts = products.filter((p) => p.tags.includes('бомбочки')).slice(0, 6)
  const giftSetProducts = products.filter((p) => p.tags.includes('набори')).slice(0, 6)
  const cupsProducts = products.filter((p) => p.tags.includes('чашки')).slice(0, 6)

  return (
    <>
      <Helmet>
        <title>Какао бомбочки з маршмелоу — ручна робота | ChocoPix</title>
        <meta
          name="description"
          content="Купити какао бомбочки з маршмелоу, подарункові набори та фірмові чашки з доставкою по Україні. Ручна робота, натуральний склад."
        />
        <link rel="canonical" href="https://chocopix.store/" />
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
            <p className="mt-8 max-w-xl text-[19px] leading-10 text-[#8a5d3c]">
              Відчуйте справжній вибух смаку! Просто покладіть шоколадну бомбочку в чашку, залийте гарячим молоком і спостерігайте, як народжується диво.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#catalog">
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
          <HeroBomb />
        </section>

        {/* Category Navigation Blocks */}
        <section className="py-8">
          <div className="grid gap-6 md:grid-cols-3">
            <motion.a
              href="#bombочки"
              className="group relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(92,55,28,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(92,55,28,0.2)]"
              initial={{ opacity: 0.7, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
              <img
                src="/images/107270_001.jpg"
                alt="Бомбочки"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-3xl font-semibold text-white">Бомбочки</h3>
                <p className="mt-2 text-sm text-white">Шоколадні бомбочки з маршмелоу</p>
              </div>
            </motion.a>

            <motion.a
              href="#набори"
              className="group relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(92,55,28,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(92,55,28,0.2)]"
              initial={{ opacity: 0.7, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
              <img
                src="/images/photo_2024-11-12_01-.jpg"
                alt="Набори"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-3xl font-semibold text-white">Набори</h3>
                <p className="mt-2 text-sm text-white">Подарункові набори</p>
              </div>
            </motion.a>

            <motion.a
              href="#чашки"
              className="group relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(92,55,28,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(92,55,28,0.2)]"
              initial={{ opacity: 0.7, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
              <img
                src="/images/1.jpg"
                alt="Чашки"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-3xl font-semibold text-white">Чашки</h3>
                <p className="mt-2 text-sm text-white">Фірмові чашки</p>
              </div>
            </motion.a>
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
              <item.icon className="text-[#c78f59]" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-[#4c1d11]">{item.title}</h2>
              <p className="mt-3 text-sm text-[#805339]">{item.text}</p>
            </motion.article>
          ))}
        </section>

        {/* Бомбочки Catalog Section */}
        <section id="bombочки" className="scroll-mt-24 py-12">
          <Helmet>
            <title>Бомбочки з маршмелоу — купити шоколадні бомбочки | ChocoPix</title>
            <meta
              name="description"
              content="Шоколадні бомбочки з маршмелоу: карамель, ягода, горіх, ваніль та інші смаки. Ручна робота, натуральний склад. Доставка по Україні."
            />
            <link rel="canonical" href="https://chocopix.store/#bombочки" />
          </Helmet>
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
          <Helmet>
            <title>Подарункові набори бомбочок — готові сети | ChocoPix</title>
            <meta
              name="description"
              content="Подарункові набори шоколадних бомбочок: класична колекція, преміум тріо, сімейний пакунок. Ідеальний подарунок для близьких."
            />
            <link rel="canonical" href="https://chocopix.store/#набори" />
          </Helmet>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Подарунки</p>
              <h2 className="mt-3 font-display text-6xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Набори</h2>
              <p className="mt-3 max-w-xl text-lg text-[#8a5d3c]">
                Готові подарункові набори з кількох смаків. Чудовий вибір для свята або щоб порадувати близьких.
              </p>
            </div>
            <a href="#чашки" className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-cocoa-900/70 transition hover:text-cocoa-900 lg:block">
              До чашок →
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {giftSetProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Чашки Catalog Section */}
        <section id="чашки" className="scroll-mt-24 py-12">
          <Helmet>
            <title>Фірмові чашки для какао та кави — кераміка, скло, термо | ChocoPix</title>
            <meta
              name="description"
              content="Фірмові чашки ChocoPix: керамічні, скляні, термочашки. Зручні та стильні чашки для вашого улюбленого какао та кави."
            />
            <link rel="canonical" href="https://chocopix.store/#чашки" />
          </Helmet>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Аксесуари</p>
              <h2 className="mt-3 font-display text-6xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Чашки</h2>
              <p className="mt-3 max-w-xl text-lg text-[#8a5d3c]">
                Фірмові чашки для ідеального какао. Кераміка, скло, термочашки — обирайте свій формат.
              </p>
            </div>
            <a href="#how-it-works" className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-cocoa-900/70 transition hover:text-cocoa-900 lg:block">
              Як це працює →
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cupsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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

        <section className="py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Відгуки</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-[28px] border border-[#eadfcb] bg-[#f8f1e4] p-6 shadow-[0_18px_40px_rgba(92,55,28,0.05)]">
                <p className="text-sm leading-7 text-[#6e4935]">“{review.text}”</p>
                <p className="mt-4 font-semibold">{review.name}</p>
              </article>
            ))}
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
