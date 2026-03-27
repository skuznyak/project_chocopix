import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

type DeferredSectionProps = {
  id?: string
  children: ReactNode
  minHeightClassName?: string
  rootMargin?: string
}

export const DeferredSection = ({
  id,
  children,
  minHeightClassName = 'min-h-[620px]',
  rootMargin = '320px',
}: DeferredSectionProps) => {
  const { ref, isVisible } = useInView({ rootMargin, triggerOnce: true })

  return (
    <div id={id} ref={ref} className="w-full scroll-mt-24">
      {isVisible ? (
        children
      ) : (
        <div
          aria-hidden="true"
          className={`rounded-[30px] border border-[#eadfcb] bg-[#fbf5eb] shadow-[0_12px_28px_rgba(92,55,28,0.04)] ${minHeightClassName}`}
        />
      )}
    </div>
  )
}

export default DeferredSection
