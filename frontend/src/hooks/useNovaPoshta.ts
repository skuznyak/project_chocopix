import { useQuery } from '@tanstack/react-query'
import { getAreas, getCities, getWarehouses } from '@/api/novaposhta'

export const useAreas = (query?: string) =>
  useQuery({
    queryKey: ['nova-poshta-areas', query || ''],
    queryFn: () => getAreas(query),
    enabled: query === undefined || query.length === 0 || query.length >= 2,
    initialData: query === undefined || query.length === 0 ? [] : undefined,
  })

export const useCities = (areaRef?: string, query?: string) =>
  useQuery({
    queryKey: ['nova-poshta-cities', areaRef || '', query || ''],
    queryFn: () => getCities({ areaRef, q: query }),
    enabled: Boolean(areaRef) || Boolean(query && query.length > 1),
  })

export const useWarehouses = (cityRef?: string, query?: string) =>
  useQuery({
    queryKey: ['nova-poshta-warehouses', cityRef || '', query || ''],
    queryFn: () => getWarehouses(cityRef!, query),
    enabled: Boolean(cityRef),
    initialData: [],
  })
