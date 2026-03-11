import { Autocomplete, type AutocompleteOption } from '@/components/ui/Autocomplete'
import { useAreas } from '@/hooks/useNovaPoshta'

interface AreaSelectProps {
  value?: string
  onChange?: (areaRef: string, areaDescription: string) => void
  error?: string
  disabled?: boolean
}

export const AreaSelect = ({ value, onChange, error, disabled }: AreaSelectProps) => {
  const { data: areas = [], isLoading } = useAreas()

  const options: AutocompleteOption[] = areas.map((area) => ({
    value: area.ref,
    label: area.description,
  }))

  const selectedOption: AutocompleteOption | null = value ? (options.find((opt) => opt.value === value) || null) : null

  return (
    <Autocomplete
      label="Область"
      placeholder="Оберіть область"
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange?.(option?.value || '', option?.label || '')
      }}
      loading={isLoading}
      error={error}
      disabled={disabled}
    />
  )
}
