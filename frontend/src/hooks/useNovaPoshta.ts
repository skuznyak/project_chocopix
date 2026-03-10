import { useQuery } from '@tanstack/react-query'
import { getCities, getWarehouses } from '@/api/novaposhta'

export const useCities = (query: string) =>
  useQuery({
    queryKey: ['nova-poshta-cities', query],
    queryFn: () => getCities(query),
    enabled: query.trim().length > 1,
  })

export const useWarehouses = (city: string) =>
  useQuery({
    queryKey: ['nova-poshta-warehouses', city],
    queryFn: () => getWarehouses(city),
    enabled: Boolean(city),
  })
