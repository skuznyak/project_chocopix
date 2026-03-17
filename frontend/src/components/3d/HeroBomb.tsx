import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export const HeroBomb = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95])
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3])

  return (
    <motion.div
      ref={containerRef}
      className="group relative h-[430px] w-full lg:h-[620px]"
      style={{ y, scale, rotate }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute right-0 top-0 h-full w-[88%] overflow-hidden rounded-[42px] border border-[#ddd7bc] bg-[linear-gradient(180deg,#f8f3ec_0%,#efe2cf_45%,#ead8bc_100%)] shadow-[0_30px_80px_rgba(92,55,28,0.08)]">
        {/* Сіяйво зверху */}
        <div className="absolute inset-x-0 top-0 h-[52%] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.95)_0%,rgba(253,242,232,0.9)_26%,rgba(248,231,212,0.38)_62%,rgba(248,231,212,0)_100%)]" />
        
        {/* Сіяйво знизу */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[radial-gradient(circle_at_50%_100%,rgba(167,112,67,0.22)_0%,rgba(167,112,67,0)_62%)]" />

        {/* Фото бомбочки - з округленими краями і однаковою рамкою */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-[8%] lg:p-[7%]"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src="/animations/hot-chocolate-bomb-.webp"
            alt="Какао бомбочка"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full rounded-[32px] object-cover"
          />
        </motion.div>

        {/* Табличка з безкоштовною доставкою - з'являється збоку при наведенні */}
        <motion.div
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-[18px] border border-[#a4693f]/30 bg-[#e8b890] px-5 py-4 text-white shadow-[0_8px_30px_rgba(91,28,2,0.2)] backdrop-blur-sm"
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: isHovered ? 0 : -100, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#8c5328]/90">Від</span>
            <span className="text-lg font-bold text-[#8c5328]">2000 грн</span>
            <div className="mt-1 h-[1px] w-full bg-[#8c5328]/30" />
            <span className="text-[15px] font-bold text-[#8c5328]">Безкоштовна доставка</span>
          </div>
        </motion.div>

        {/* Підказка знизу */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/25 bg-[linear-gradient(90deg,rgba(100,56,34,0.72),rgba(90,52,36,0.5))] px-5 py-4 text-sm text-white/95 backdrop-blur-sm"
          animate={{ y: isHovered ? -4 : 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Секретний інгредієнт: любов та бельгійський шоколад
        </motion.div>
      </div>
    </motion.div>
  )
}
