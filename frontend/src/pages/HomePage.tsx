import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Candy, Gift, HandHeart, Leaf, Milk, Soup, Sparkles, Truck } from 'lucide-react'
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
    text: 'Налий у чашку приблизно 250-300 мл гарячого молока або води.',
  },
  {
    icon: Candy,
    accent: 'from-[#f6e4d0] to-[#e8c6a8]',
    text: 'Опусти шоколадну кульку й дай їй кілька секунд, щоб красиво розкритися.',
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
  { question: 'Чи можна дітям?', answer: 'Так, але зважайте на індивідуальні алергії та вміст цукру.' },
  { question: 'Яка доставка?', answer: 'Нова Пошта, відділення, поштомат або курʼєр.' },
]

export default function HomePage() {
  const { data: products = [] } = useProducts({ sort: 'popular' })
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Какао бомбочки з маршмелоу — ручна робота</title>
        <meta
          name="description"
          content="Купити какао бомбочки з маршмелоу з доставкою по Україні. Ручна робота, натуральний склад. Ідеальний подарунок."
        />
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
                onClick={() => setIsCallbackOpen(true)}
                className="min-h-16 rounded-[22px] bg-[#e8b890] px-9 text-[19px] font-extrabold text-[#8c5328] shadow-[0_18px_40px_rgba(91,28,2,0.18)] hover:bg-[#f0c9a8]"
              >
                Хочу солодкого
              </Button>
            </div>
          </div>
          <HeroBomb />
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

        <section id="catalog" className="py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c78f59]">Каталог</p>
              <h2 className="mt-3 font-display text-6xl font-semibold tracking-[-0.04em] text-[#4c1d11]">Найпопулярніші смаки</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
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
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white/65 shadow-[0_8px_20px_rgba(92,55,28,0.08)]">
                        <step.icon size={26} className="text-[#8b5c3c]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9f7357]">Крок {index + 1}</p>
                        <p className="mt-2 text-[22px] font-medium leading-[1.18] tracking-[-0.03em] sm:text-[26px]">
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
