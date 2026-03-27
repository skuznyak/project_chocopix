import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import clsx from 'clsx'

export interface AutocompleteOption {
  value: string
  label: string
}

interface AutocompleteProps {
  label: string
  placeholder?: string
  options: AutocompleteOption[]
  value: AutocompleteOption | null
  onChange: (option: AutocompleteOption | null) => void
  onSearch?: (query: string) => void
  loading?: boolean
  error?: string
  disabled?: boolean
}

export const Autocomplete = ({
  label,
  placeholder = 'Оберіть...',
  options,
  value,
  onChange,
  onSearch,
  loading = false,
  error,
  disabled = false,
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (onSearch && isOpen) {
      const timeoutId = setTimeout(() => {
        onSearch(searchQuery)
      }, 300)

      return () => clearTimeout(timeoutId)
    }
  }, [searchQuery, isOpen, onSearch])

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
    } else if (value) {
      setSearchQuery(value.label)
    }
  }, [isOpen, value])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (options.length > 0 && !value) {
        handleSelect(options[0])
      }
    }
  }

  const handleSelect = (option: AutocompleteOption) => {
    onChange(option)
    setIsOpen(false)
    setSearchQuery(option.label)
  }

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation()
    onChange(null)
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex flex-col gap-2" ref={wrapperRef}>
      <span className="text-sm font-semibold text-[#3D2616]">{label}</span>
      <div
        className={clsx(
          'relative flex min-h-14 items-center gap-2 rounded-[18px] border border-[#ddd9d5] bg-[#f5f5f5] px-4 py-2 transition',
          error && 'border-rose-400',
          !error && !isOpen && 'focus-within:border-[#c79263] focus-within:ring-2 focus-within:ring-[#ead3bb]',
          disabled && 'opacity-50',
        )}
      >
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent text-base text-[#3D2616] placeholder:text-[#9a8b7f] outline-none"
          placeholder={placeholder}
          value={value?.label || searchQuery || ''}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            if (!value) {
              setIsOpen(true)
            }
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ddd9d5] text-[#3D2616] transition hover:bg-[#c79263] hover:text-white"
            aria-label="Очистити"
          >
            ×
          </button>
        ) : (
          <ChevronsUpDown size={20} className="text-[#9a8b7f]" />
        )}
      </div>
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}

      {isOpen && !disabled && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-auto rounded-[18px] border border-[#ddd9d5] bg-white shadow-xl">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-[#3D2616]">Завантаження...</div>
          ) : options.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-[#9a8b7f]">Нічого не знайдено</div>
          ) : (
            <ul className="py-2">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm text-[#3D2616] transition hover:bg-[#f5f5f5]"
                >
                  <span className="flex-1">{option.label}</span>
                  {value?.value === option.value && <Check size={18} className="text-[#7d4a37]" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
