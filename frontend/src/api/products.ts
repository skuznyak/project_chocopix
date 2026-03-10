import type { Product } from '@chocopix/shared'
import axios from 'axios'
import { apiClient, USE_MOCK } from '@/api/client'
import { productsMock } from '@/data/products.mock'

export type ProductSort = 'popular' | 'price-asc' | 'price-desc'

export interface ProductFilters {
  category?: string
  flavor?: string
  maxPrice?: number
  sort?: ProductSort
}

const applyFilters = (products: Product[], filters: ProductFilters) => {
  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false
    }

    if (filters.flavor && product.flavor !== filters.flavor) {
      return false
    }

    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false
    }

    return true
  })

  return filteredProducts.sort((left, right) => {
    switch (filters.sort) {
      case 'price-asc':
        return left.price - right.price
      case 'price-desc':
        return right.price - left.price
      case 'popular':
      default:
        return right.popularity - left.popularity
    }
  })
}

const getMockProducts = (filters: ProductFilters = {}) => applyFilters(productsMock, filters)

const isProductArray = (value: unknown): value is Product[] => Array.isArray(value)

export const getProducts = async (filters: ProductFilters = {}) => {
  if (USE_MOCK) {
    return getMockProducts(filters)
  }

  try {
    const response = await apiClient.get<Product[]>('/api/products', { params: filters })

    if (!isProductArray(response.data) || response.data.length === 0) {
      return getMockProducts(filters)
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return getMockProducts(filters)
    }

    throw error
  }
}

export const getProductById = async (id: string) => {
  if (USE_MOCK) {
    const product = productsMock.find((item) => item.id === id || item.slug === id)

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  try {
    const response = await apiClient.get<Product>(`/api/products/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const product = productsMock.find((item) => item.id === id || item.slug === id)

      if (product) {
        return product
      }
    }

    throw error
  }
}
