const CART_TRIGGER_SELECTOR = '[data-cart-trigger="true"]'

export const animateAddToCart = (sourceElement: HTMLElement | null) => {
  if (typeof window === 'undefined' || !sourceElement) {
    return
  }

  const cartTrigger = document.querySelector<HTMLElement>(CART_TRIGGER_SELECTOR)

  if (!cartTrigger) {
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cartTrigger.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.08)' },
        { transform: 'scale(1)' },
      ],
      { duration: 240, easing: 'ease-out' },
    )
    return
  }

  const sourceRect = sourceElement.getBoundingClientRect()
  const targetRect = cartTrigger.getBoundingClientRect()
  const clone = sourceElement.cloneNode(true) as HTMLElement

  clone.setAttribute('aria-hidden', 'true')
  clone.style.position = 'fixed'
  clone.style.left = `${sourceRect.left}px`
  clone.style.top = `${sourceRect.top}px`
  clone.style.width = `${sourceRect.width}px`
  clone.style.height = `${sourceRect.height}px`
  clone.style.borderRadius = '24px'
  clone.style.objectFit = 'cover'
  clone.style.pointerEvents = 'none'
  clone.style.zIndex = '80'
  clone.style.boxShadow = '0 18px 36px rgba(61, 28, 2, 0.24)'
  clone.style.willChange = 'transform, opacity'

  document.body.appendChild(clone)

  const translateX = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2)
  const translateY = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2)

  const flyingImage = clone.animate(
    [
      {
        transform: 'translate3d(0, 0, 0) scale(1)',
        opacity: 1,
      },
      {
        transform: `translate3d(${translateX * 0.55}px, ${translateY * 0.35}px, 0) scale(0.72)`,
        opacity: 0.96,
        offset: 0.6,
      },
      {
        transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(0.18)`,
        opacity: 0.18,
      },
    ],
    {
      duration: 720,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  )

  const cartBounce = cartTrigger.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.12)' },
      { transform: 'scale(0.96)' },
      { transform: 'scale(1)' },
    ],
    {
      duration: 360,
      delay: 420,
      easing: 'ease-out',
    },
  )

  void cartBounce.finished.catch(() => undefined)
  void flyingImage.finished
    .catch(() => undefined)
    .finally(() => {
      clone.remove()
    })
}
