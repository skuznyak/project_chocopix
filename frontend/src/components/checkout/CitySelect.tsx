import { useState } from 'react'
import { Autocomplete, type AutocompleteOption } from '@/components/ui/Autocomplete'
import { useCities } from '@/hooks/useNovaPoshta'

interface CitySelectProps {
  areaRef?: string
  value?: string
  onChange?: (cityRef: string, cityDescription: string) => void
  error?: string
  disabled?: boolean
}

export const CitySelect = ({ areaRef, value, onChange, error, disabled }: CitySelectProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: cities = [], isLoading } = useCities(areaRef, searchQuery)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const options: AutocompleteOption[] = cities.map((city) => ({
    value: city.ref,
    label: city.description,
  }))

  const selectedOption: AutocompleteOption | null = value ? (options.find((opt) => opt.value === value) || null) : null

  return (
    <Autocomplete
      label="Населений пункт"
      placeholder="Введіть назву міста"
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange?.(option?.value || '', option?.label || '')
      }}
      onSearch={handleSearch}
      loading={isLoading}
      error={error}
      disabled={disabled || !areaRef}
    />
  )
}
