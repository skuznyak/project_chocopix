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
  const { data: cities = [], isLoading } = useCities(areaRef)

  const options: AutocompleteOption[] = cities.map((city) => ({
    value: city.ref,
    label: city.description,
  }))

  const selectedOption: AutocompleteOption | null = value ? (options.find((opt) => opt.value === value) || null) : null

  return (
    <Autocomplete
      label="Населений пункт"
      placeholder="Введіть місто"
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange?.(option?.value || '', option?.label || '')
      }}
      loading={isLoading}
      error={error}
      disabled={disabled || !areaRef}
    />
  )
}
