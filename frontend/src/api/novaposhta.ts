import { apiClient } from './client'

export interface Area {
  ref: string
  description: string
}

export interface City {
  ref: string
  description: string
  area: string
  areaRef: string
}

export interface Warehouse {
  ref: string
  description: string
  shortAddress: string
  number: string
}

export interface DeliveryCost {
  cost: number
}

export const getAreas = async (query?: string): Promise<Area[]> => {
  const response = await apiClient.get('/np/areas', { params: { q: query } })
  return response.data
}

export const getCities = async (params?: { areaRef?: string; q?: string }): Promise<City[]> => {
  const response = await apiClient.get('/np/cities', { params })
  return response.data
}

export const getWarehouses = async (cityRef: string, query?: string): Promise<Warehouse[]> => {
  const response = await apiClient.get('/np/warehouses', { params: { cityRef, q: query } })
  return response.data
}

export const getDeliveryCost = async (params: {
  senderCityRef: string
  receiverCityRef: string
  weight?: string
}): Promise<DeliveryCost> => {
  const response = await apiClient.get('/np/delivery-cost', { params })
  return response.data
}
