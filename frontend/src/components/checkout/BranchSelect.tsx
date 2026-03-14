import { useState } from 'react'
import { Autocomplete, type AutocompleteOption } from '@/components/ui/Autocomplete'
import { useWarehouses } from '@/hooks/useNovaPoshta'

interface BranchSelectProps {
  cityRef?: string
  value?: string
  onChange?: (warehouseRef: string, warehouseDescription: string) => void
  error?: string
  disabled?: boolean
}

export const BranchSelect = ({ cityRef, value, onChange, error, disabled }: BranchSelectProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: warehouses = [], isLoading, isError } = useWarehouses(cityRef, searchQuery)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const options: AutocompleteOption[] = warehouses.map((warehouse) => ({
    value: warehouse.ref,
    label: warehouse.description,
  }))

  const selectedOption: AutocompleteOption | null = value ? (options.find((opt) => opt.value === value) || null) : null

  return (
    <Autocomplete
      label="Номер відділення"
      placeholder="Введіть номер або назву відділення"
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange?.(option?.value || '', option?.label || '')
      }}
      onSearch={handleSearch}
      loading={isLoading}
      error={error ?? (isError ? "Не вдалося завантажити відділення. Перевірте з'єднання з сервером." : undefined)}
      disabled={disabled || !cityRef}
    />
  )
}
