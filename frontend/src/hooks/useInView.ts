import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  rootMargin?: string
  triggerOnce?: boolean
}

export const useInView = ({ rootMargin = '200px', triggerOnce = true }: UseInViewOptions = {}) => {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    if (!node || (triggerOnce && hasTriggeredRef.current)) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      hasTriggeredRef.current = true
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          hasTriggeredRef.current = true
          setIsVisible(true)

          if (triggerOnce) {
            observer.disconnect()
          }

          return
        }

        if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { rootMargin },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [node, rootMargin, triggerOnce])

  return {
    ref: setNode,
    isVisible,
  }
}
