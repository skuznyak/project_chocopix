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
  const { data: warehouses = [], isLoading } = useWarehouses(cityRef)

  const options: AutocompleteOption[] = warehouses.map((warehouse) => ({
    value: warehouse.ref,
    label: warehouse.description,
  }))

  const selectedOption: AutocompleteOption | null = value ? (options.find((opt) => opt.value === value) || null) : null

  return (
    <Autocomplete
      label="Номер відділення"
      placeholder="Оберіть відділення або поштомат"
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange?.(option?.value || '', option?.label || '')
      }}
      loading={isLoading}
      error={error}
      disabled={disabled || !cityRef}
    />
  )
}
