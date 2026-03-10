import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = ({ label, error, className, ...props }: InputProps) => (
  <label className="flex flex-col gap-2 text-sm font-semibold text-[#5f3925]">
    <span>{label}</span>
    <input
      className={clsx(
        'min-h-14 rounded-[18px] border border-[#ddd9d5] bg-[#f5f5f5] px-4 py-3 text-base text-[#2d1f1a] placeholder:text-[#9a8b7f] outline-none transition focus:border-[#c79263] focus:ring-2 focus:ring-[#ead3bb]',
        error && 'border-rose-400 focus:border-rose-400 focus:ring-rose-100',
        className,
      )}
      {...props}
    />
    {error ? <span className="text-xs text-rose-600">{error}</span> : null}
  </label>
)
