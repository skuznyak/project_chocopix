import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts, type ProductFilters } from '@/api/products'

export const useProducts = (filters: ProductFilters = {}) =>
  useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  })

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  })
