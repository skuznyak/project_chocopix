import { motion } from 'framer-motion'

export const HeroBomb = () => (
  <motion.div
    className="group relative h-[430px] w-full lg:h-[620px]"
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    <motion.div
      className="absolute left-0 top-24 hidden h-20 w-20 items-center justify-center rounded-[18px] bg-[#f7f4e8] shadow-[0_18px_40px_rgba(74,41,14,0.08)] md:flex"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-4xl">🥛</span>
    </motion.div>

    <div className="absolute right-0 top-0 h-full w-[88%] overflow-hidden rounded-[42px] border border-[#ddd7bc] bg-[linear-gradient(180deg,#f8f3ec_0%,#efe2cf_45%,#ead8bc_100%)] shadow-[0_30px_80px_rgba(92,55,28,0.08)]">
      <div className="absolute inset-x-0 top-0 h-[52%] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.95)_0%,rgba(253,242,232,0.9)_26%,rgba(248,231,212,0.38)_62%,rgba(248,231,212,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[radial-gradient(circle_at_50%_100%,rgba(167,112,67,0.22)_0%,rgba(167,112,67,0)_62%)]" />

      <motion.div
        className="absolute left-1/2 top-[76px] z-20 h-[240px] w-10 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,250,241,0.15)_20%,rgba(255,248,240,0.9)_48%,rgba(247,234,215,0.96)_100%)] opacity-70 blur-[1px]"
        variants={{
          rest: { scaleY: 0, opacity: 0, y: -30 },
          hover: { scaleY: 1, opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
      />

      <motion.div
        className="absolute left-1/2 top-[130px] z-10 h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_72%)]"
        variants={{
          rest: { scale: 0.7, opacity: 0.2 },
          hover: { scale: 1.18, opacity: 0.9 },
        }}
        transition={{ duration: 0.45 }}
      />

      <div className="absolute inset-x-0 bottom-0 flex h-[82%] items-end justify-center pb-10">
        <div className="relative h-[360px] w-[320px] sm:h-[420px] sm:w-[380px]">
          <div className="absolute inset-x-9 bottom-0 h-14 rounded-full bg-[radial-gradient(circle,rgba(117,74,43,0.28)_0%,rgba(117,74,43,0.08)_45%,rgba(117,74,43,0)_78%)] blur-2xl" />

          <div className="absolute inset-x-[54px] bottom-[34px] h-[214px] rounded-b-[132px] border-[10px] border-[#fdf7ef] bg-[linear-gradient(180deg,#fffdf9_0%,#faf4ea_100%)] shadow-[0_30px_50px_rgba(90,52,36,0.15)] sm:inset-x-[62px] sm:h-[246px]" />
          <div className="absolute right-[20px] bottom-[102px] h-[110px] w-[90px] rounded-r-[60px] border-[10px] border-l-0 border-[#fdf7ef] bg-transparent sm:right-[28px] sm:bottom-[118px]" />
          <div className="absolute inset-x-[82px] bottom-[220px] h-8 rounded-full border-[10px] border-[#fdf7ef] bg-[#fffaf3] shadow-[0_8px_20px_rgba(90,52,36,0.08)] sm:inset-x-[94px] sm:bottom-[252px]" />

          <motion.div
            className="absolute inset-x-[82px] bottom-[56px] h-[172px] overflow-hidden rounded-b-[104px] rounded-t-[18px] bg-[linear-gradient(180deg,#7b4a33_0%,#6a3d29_58%,#5a311f_100%)] sm:inset-x-[94px] sm:h-[198px]"
            variants={{
              rest: { height: 172 },
              hover: { height: 188 },
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-[76px] bg-[linear-gradient(180deg,#f5efe4_0%,#f0e0c8_100%)]"
              variants={{
                rest: { opacity: 0, y: -26 },
                hover: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, delay: 0.08 }}
            />
            <motion.div
              className="absolute left-1/2 top-[-14px] h-10 w-[78%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.18)_55%,rgba(255,255,255,0)_100%)]"
              variants={{
                rest: { opacity: 0.18 },
                hover: { opacity: 0.8 },
              }}
              transition={{ duration: 0.35, delay: 0.12 }}
            />
            <motion.div
              className="absolute left-[20%] top-[32px] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#8e5b43_0%,#6d3c27_70%,#4e2719_100%)] shadow-[0_10px_20px_rgba(58,28,16,0.28)]"
              variants={{
                rest: { scale: 1, y: 0, opacity: 1 },
                hover: { scale: 0.35, y: 54, opacity: 0.25 },
              }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-[52%] top-[46px] h-5 w-5 rounded-full bg-[#fff3e6]/75 blur-[1px]"
              variants={{
                rest: { opacity: 0, scale: 0.4 },
                hover: { opacity: 0.95, scale: 1.1 },
              }}
              transition={{ duration: 0.38, delay: 0.18 }}
            />
            <motion.div
              className="absolute left-[58%] top-[74px] h-3 w-3 rounded-full bg-[#fff1de]/80"
              variants={{
                rest: { opacity: 0, scale: 0.4 },
                hover: { opacity: 0.9, scale: 1 },
              }}
              transition={{ duration: 0.32, delay: 0.24 }}
            />
            <motion.div
              className="absolute left-[35%] top-[80px] h-[74px] w-[110px] rounded-full bg-[radial-gradient(circle,rgba(255,244,228,0.62)_0%,rgba(255,244,228,0.24)_54%,rgba(255,244,228,0)_100%)] blur-lg"
              variants={{
                rest: { opacity: 0.1, scale: 0.85 },
                hover: { opacity: 0.92, scale: 1.15 },
              }}
              transition={{ duration: 0.48, delay: 0.16 }}
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 bottom-[244px] z-30 h-12 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.2)_58%,rgba(255,255,255,0)_100%)] blur-md"
            variants={{
              rest: { opacity: 0.2, scale: 0.8 },
              hover: { opacity: 0.95, scale: 1.25 },
            }}
            transition={{ duration: 0.42, delay: 0.14 }}
          />
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/25 bg-[linear-gradient(90deg,rgba(100,56,34,0.72),rgba(90,52,36,0.5))] px-5 py-4 text-sm text-white/95 backdrop-blur-sm"
        variants={{
          rest: { y: 0, opacity: 1 },
          hover: { y: -4, opacity: 1 },
        }}
      >
        Секретний інгредієнт: любов та бельгійський шоколад
      </motion.div>
    </div>
  </motion.div>
)
