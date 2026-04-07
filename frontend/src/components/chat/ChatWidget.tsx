import { useEffect, useId, useRef, useState } from 'react'
import type { JSX, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { MessageCircleMore, X } from 'lucide-react'
import { telegramLink, viberLink } from '@/config/contactLinks'

interface ChatAction {
  id: 'telegram' | 'viber'
  href: string
  label: string
  icon: JSX.Element
  iconWrapperClassName?: string
}

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current text-[#229ED9]">
    <path d="M19.3 4.52a1.4 1.4 0 0 1 1.92 1.6l-2.63 12.39a1.4 1.4 0 0 1-2 1l-3.75-1.74-2 1.93a1.4 1.4 0 0 1-2.36-.94l-.15-3.13L16 8.64a.6.6 0 0 0-.73-.95L7.7 12.46l-3.76-1.24a1.4 1.4 0 0 1-.06-2.64L19.3 4.52Z" />
  </svg>
)

const ViberIcon = () => (
  <img src="/products/viber-logo.png" alt="" className="h-5 w-5 object-contain" loading="lazy" decoding="async" />
)

const actions: ChatAction[] = [
  {
    id: 'telegram',
    href: telegramLink,
    label: 'Написати в Telegram',
    icon: <TelegramIcon />,
    iconWrapperClassName: 'bg-transparent',
  },
  {
    id: 'viber',
    href: viberLink,
    label: 'Написати у Viber',
    icon: <ViberIcon />,
  },
]

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const widgetRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        triggerRef.current?.focus()
      }
      wasOpenRef.current = false
      return
    }

    wasOpenRef.current = true

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!widgetRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    itemRefs.current[0]?.focus()

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return

    const currentIndex = itemRefs.current.findIndex((item) => item === document.activeElement)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = currentIndex >= actions.length - 1 ? 0 : currentIndex + 1
      itemRefs.current[nextIndex]?.focus()
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = currentIndex <= 0 ? actions.length - 1 : currentIndex - 1
      itemRefs.current[nextIndex]?.focus()
    }

    if (event.key === 'Home') {
      event.preventDefault()
      itemRefs.current[0]?.focus()
    }

    if (event.key === 'End') {
      event.preventDefault()
      itemRefs.current[actions.length - 1]?.focus()
    }
  }

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-[calc(6.75rem+env(safe-area-inset-bottom,0px))] left-4 z-40 hidden flex-col items-start gap-3 md:bottom-6 md:left-auto md:right-4 md:flex md:items-end"
      onKeyDown={handleMenuKeyDown}
    >
      <div
        id={menuId}
        role="menu"
        aria-label="Швидкий зв'язок"
        className={`w-[min(18rem,calc(100vw-2rem))] origin-bottom-right rounded-[24px] border border-[#eadfcb] bg-[#fffaf2]/95 p-2.5 shadow-[0_18px_40px_rgba(92,55,28,0.16)] backdrop-blur transition-all duration-200 ${
          isOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-95 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="space-y-2">
          {actions.map((action, index) => (
            <a
              key={action.id}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              className="flex min-h-12 items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold text-[#5d3b2b] transition hover:bg-[#f6ecde] focus:outline-none focus:ring-2 focus:ring-[#d8b18b] focus:ring-offset-2 focus:ring-offset-[#fffaf2]"
              onClick={() => setIsOpen(false)}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[#8c5328] ${
                  action.iconWrapperClassName ?? 'bg-[#f3e4d2]'
                }`}
              >
                {action.icon}
              </span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      <button
        ref={triggerRef}
        type="button"
        aria-label={isOpen ? "Закрити меню чату" : "Відкрити меню чату"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c89d78] bg-[#8c5328] text-white shadow-[0_14px_32px_rgba(92,55,28,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7a4828] focus:outline-none focus:ring-2 focus:ring-[#d9aa85] focus:ring-offset-2 focus:ring-offset-[#f4eddc] md:h-14 md:w-14"
      >
        {isOpen ? <X size={22} strokeWidth={2.4} /> : <MessageCircleMore size={22} strokeWidth={2.2} />}
      </button>
    </div>
  )
}
