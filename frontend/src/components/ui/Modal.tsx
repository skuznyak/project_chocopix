import type { PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  contentClassName?: string
}

const overlayTransition = {
  duration: 0.26,
  ease: [0.22, 1, 0.36, 1] as const,
}

const contentTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
}

export const Modal = ({ isOpen, onClose, contentClassName, children }: PropsWithChildren<ModalProps>) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-900/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          onClick={onClose}
        >
          <motion.div
            className={`w-full max-w-3xl rounded-[28px] bg-white p-4 shadow-glass md:p-6 ${contentClassName ?? ''}`}
            initial={{ y: 20, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, scale: 0.985, opacity: 0 }}
            transition={contentTransition}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
