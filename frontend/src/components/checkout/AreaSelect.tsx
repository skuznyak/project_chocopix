import { useState } from 'react'
import { Autocomplete, type AutocompleteOption } from '@/components/ui/Autocomplete'
import { useAreas } from '@/hooks/useNovaPoshta'

interface AreaSelectProps {
  value?: string
  onChange?: (areaRef: string, areaDescription: string) => void
  error?: string
  disabled?: boolean
}

export const AreaSelect = ({ value, onChange, error, disabled }: AreaSelectProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: areas = [], isLoading } = useAreas(searchQuery.length === 0 ? undefined : searchQuery)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const options: AutocompleteOption[] = areas.map((area) => ({
    value: area.ref,
    label: area.description,
  }))

  const selectedOption: AutocompleteOption | null = value ? (options.find((opt) => opt.value === value) || null) : null

  return (
    <Autocomplete
      label="Область"
      placeholder="Введіть назву області"
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange?.(option?.value || '', option?.label || '')
      }}
      onSearch={handleSearch}
      loading={isLoading}
      error={error}
      disabled={disabled}
    />
  )
}
