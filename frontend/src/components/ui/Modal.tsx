import type { PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  contentClassName?: string
}

export const Modal = ({ isOpen, onClose, contentClassName, children }: PropsWithChildren<ModalProps>) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-900/70 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`w-full max-w-3xl rounded-[28px] bg-white p-4 shadow-glass md:p-6 ${contentClassName ?? ''}`}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
)
