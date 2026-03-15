import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

const SHOW_AFTER_SCROLL_Y = 320

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_Y)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Прокрутити вгору"
      onClick={handleClick}
      className={`fixed bottom-6 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#b97a4a] bg-[#8c5328] text-white shadow-lg transition-all duration-300 hover:bg-[#7d4a37] focus:outline-none focus:ring-2 focus:ring-[#d9aa85] focus:ring-offset-2 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ChevronUp size={22} strokeWidth={2.6} />
    </button>
  )
}
