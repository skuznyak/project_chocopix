import { useQuery } from '@tanstack/react-query'
import { getAreas, getCities, getWarehouses } from '@/api/novaposhta'

export const useAreas = () =>
  useQuery({
    queryKey: ['nova-poshta-areas'],
    queryFn: getAreas,
  })

export const useCities = (areaRef?: string, query?: string) =>
  useQuery({
    queryKey: ['nova-poshta-cities', areaRef || '', query || ''],
    queryFn: () => getCities({ areaRef, q: query }),
    enabled: Boolean(areaRef) || Boolean(query && query.length > 1),
  })

export const useWarehouses = (cityRef?: string) =>
  useQuery({
    queryKey: ['nova-poshta-warehouses', cityRef || ''],
    queryFn: () => getWarehouses(cityRef!),
    enabled: Boolean(cityRef),
    initialData: [],
  })
