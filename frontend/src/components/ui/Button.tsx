import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  fullWidth = false,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={clsx(
      'inline-flex min-h-11 items-center justify-center rounded-[20px] px-6 py-3 text-sm font-semibold transition duration-200',
      {
        'bg-cocoa-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-cocoa-700': variant === 'primary',
        'border border-[#e3d7cf] bg-[#f6f2ef] text-cocoa-900 hover:border-cocoa-900/25 hover:bg-white':
          variant === 'secondary',
        'bg-transparent text-cocoa-900 hover:bg-cocoa-900/5': variant === 'ghost',
        'w-full': fullWidth,
      },
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
