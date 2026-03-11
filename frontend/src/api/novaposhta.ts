import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

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
  const response = await axios.get(`${API_URL}/api/np/areas`, { params: { q: query } })
  return response.data
}

export const getCities = async (params?: { areaRef?: string; q?: string }): Promise<City[]> => {
  const response = await axios.get(`${API_URL}/api/np/cities`, { params })
  return response.data
}

export const getWarehouses = async (cityRef: string, query?: string): Promise<Warehouse[]> => {
  const response = await axios.get(`${API_URL}/api/np/warehouses`, { params: { cityRef, q: query } })
  return response.data
}

export const getDeliveryCost = async (params: {
  senderCityRef: string
  receiverCityRef: string
  weight?: string
}): Promise<DeliveryCost> => {
  const response = await axios.get(`${API_URL}/api/np/delivery-cost`, { params })
  return response.data
}
