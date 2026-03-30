import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

type HeroSlide = {
  title: string
  accent: string
  description: string
  secret: string
  image: string
  imageAlt: string
  href: string
  ctaLabel: string
}

const SLIDE_DURATION_MS = 3000

const slides: HeroSlide[] = [
  {
    title: 'Какао бомбочки',
    accent: 'з маршмелоу',
    description:
      'Какао бомбочки з маршмелоу - це десерт, який перетворює звичайне какао на емоцію. Якщо хочете какао бомбочки купити онлайн, тут зібрані авторські смаки для подарунка або затишного вечора.',
    secret: 'Секретний інгредієнт: любов та бельгійський шоколад',
    image: '/products/heart_chocolate.webp',
    imageAlt: 'Какао бомбочки з маршмелоу ChocoPix',
    href: '/cacao-bombs',
    ctaLabel: 'Спробувати зараз',
  },
  {
    title: 'Набори\nкакао бомбочок',
    accent: 'для справжніх гурманів',
    description:
      'Відкрийте для себе різноманіття смаків у наших подарункових наборах. Кожна бомбочка - це маленьке свято.',
    secret: 'Тільки натуральні інгредієнти та преміальний какао',
    image: '/products/gift-set-family-classic-10.webp',
    imageAlt: 'Подарунковий набір какао бомбочок ChocoPix',
    href: '/gift-sets',
    ctaLabel: 'Дивитись набори',
  },
  {
    title: 'Маршмелоу',
    accent: 'ручної роботи',
    description:
      'Ніжні, повітряні та неймовірно смачні. Наші маршмелоу ідеально доповнюють будь-який гарячий напій.',
    secret: 'Унікальна рецептура та ручна робота',
    image: '/products/marshmallow/Marshmallow_with_cinnamon.webp',
    imageAlt: 'Маршмелоу ручної роботи ChocoPix',
    href: '/marshmallow',
    ctaLabel: 'Хочу солодкого',
  },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsDesktop(media.matches)

    sync()
    media.addEventListener('change', sync)

    return () => media.removeEventListener('change', sync)
  }, [])

  return isDesktop
}

function HeroTextBlock({ slide, animated }: { slide: HeroSlide; animated: boolean }) {
  const content = (
    <>
      <h1 className="max-w-[11.5ch] whitespace-pre-line font-display text-[3rem] font-semibold leading-[0.9] tracking-[-0.055em] text-[#3D2616] sm:max-w-[12ch] sm:text-[3.8rem] lg:max-w-[13.5ch] lg:text-[4.2rem] xl:max-w-[13ch] xl:text-[93px]">
        {slide.title}
        {'\n'}
        <span className="font-display italic text-[#D39B60]">{slide.accent}</span>
      </h1>
      <p className="mt-5 max-w-xl font-heroBody text-base leading-8 text-[#6e5647] sm:text-lg">{slide.description}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        {slide.href.startsWith('/') ? (
          <Link to={slide.href}>
            <Button className="min-h-14 rounded-[20px] bg-[#4f2f1d] px-8 font-heroBody text-base font-semibold text-[#fff7f0] shadow-[0_20px_45px_rgba(61,38,22,0.18)] hover:bg-[#3D2616]">
              {slide.ctaLabel} <ArrowRight className="ml-3" size={18} />
            </Button>
          </Link>
        ) : (
          <a href={slide.href}>
            <Button className="min-h-14 rounded-[20px] bg-[#4f2f1d] px-8 font-heroBody text-base font-semibold text-[#fff7f0] shadow-[0_20px_45px_rgba(61,38,22,0.18)] hover:bg-[#3D2616]">
              {slide.ctaLabel} <ArrowRight className="ml-3" size={18} />
            </Button>
          </a>
        )}
        <div className="inline-flex min-h-14 items-center rounded-[20px] border border-[#d8c4aa] bg-white/45 px-6 font-heroBody text-sm font-medium text-[#6b5240] backdrop-blur-sm sm:max-w-[280px]">
          {slide.secret}
        </div>
      </div>
    </>
  )

  if (!animated) {
    return <div>{content}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.title}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -28 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  )
}

function DesktopVisual({ slide, activeIndex, onAdvance }: { slide: HeroSlide; activeIndex: number; onAdvance: () => void }) {
  const areaRef = useRef<HTMLDivElement | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [progress, setProgress] = useState(0)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 280, damping: 28, mass: 0.4 })
  const springY = useSpring(cursorY, { stiffness: 280, damping: 28, mass: 0.4 })

  const radius = 26
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (!isHovering) {
      setProgress(0)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      startTimeRef.current = null
      return
    }

    const tick = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time
      }

      const elapsed = time - startTimeRef.current
      const nextProgress = Math.min(elapsed / SLIDE_DURATION_MS, 1)
      setProgress(nextProgress)

      if (nextProgress >= 1) {
        startTimeRef.current = time
        setProgress(0)
        onAdvance()
      }

      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [isHovering, onAdvance])

  useEffect(() => {
    setProgress(0)
    startTimeRef.current = null
  }, [activeIndex])

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = areaRef.current?.getBoundingClientRect()
    if (!rect) return

    cursorX.set(event.clientX - rect.left)
    cursorY.set(event.clientY - rect.top)
  }

  return (
    <div
      ref={areaRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className="relative mx-auto aspect-square w-full max-w-[633px] overflow-hidden rounded-[60px] border border-white/50 bg-[linear-gradient(160deg,rgba(255,255,255,0.78),rgba(234,218,202,0.6))] p-5 shadow-[0_38px_90px_rgba(61,38,22,0.14)]"
      style={{ cursor: isHovering ? 'none' : 'default' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(170,112,75,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.55),transparent_34%)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          className="relative h-full overflow-hidden rounded-[46px] bg-[#ccb39c]"
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -56 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={slide.image} alt={slide.imageAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c160d]/60 via-[#2c160d]/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-[30px] border border-white/15 bg-[#552d1b]/88 px-7 py-5 text-center font-heroBody text-sm font-medium text-[#f5e8dc] shadow-[0_20px_40px_rgba(44,22,13,0.3)] backdrop-blur-md">
            {slide.secret}
          </div>
        </motion.div>
      </AnimatePresence>

      {isHovering ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ x: springX, y: springY }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-[0_10px_25px_rgba(61,38,22,0.24)]">
            <circle cx="30" cy="30" r={radius} fill="rgba(255,248,240,0.18)" stroke="rgba(255,248,240,0.35)" strokeWidth="3" />
            <image href="/favicon.svg" x="18" y="18" width="24" height="24" preserveAspectRatio="xMidYMid meet" />
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke="#D39B60"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              transform="rotate(-90 30 30)"
            />
          </svg>
        </motion.div>
      ) : null}
    </div>
  )
}

export function PremiumHero() {
  const isDesktop = useIsDesktop()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  if (!isDesktop) {
    const mobileSlide = slides[0]

    return (
      <section className="grid gap-8 py-6 lg:hidden">
        <div className="rounded-[32px] bg-[linear-gradient(180deg,#f7f1e8_0%,#efe4d6_100%)] p-6 shadow-[0_22px_60px_rgba(61,38,22,0.08)]">
          <HeroTextBlock slide={mobileSlide} animated={false} />
        </div>
      </section>
    )
  }

  return (
    <section className="hidden gap-10 py-10 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <div className="pr-4">
        <HeroTextBlock slide={activeSlide} animated />
      </div>
      <DesktopVisual slide={activeSlide} activeIndex={activeIndex} onAdvance={goNext} />
    </section>
  )
}

export default PremiumHero
