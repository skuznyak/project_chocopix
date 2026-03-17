import type { Request, Response } from 'express'
import axios from 'axios'

const NOVA_POSHTA_API_KEY = process.env.NOVA_POSHTA_API_KEY || ''
const NOVA_POSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/'

console.log('Nova Poshta API Key loaded:', NOVA_POSHTA_API_KEY ? '***' + NOVA_POSHTA_API_KEY.slice(-8) : 'NOT SET')

// Кеш для даних (спрощений, в пам'яті)
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 хвилин

const getLatestCacheByPrefix = (prefix: string) => {
  const entries = [...cache.entries()]
    .filter(([key]) => key.startsWith(prefix))
    .sort((a, b) => b[1].timestamp - a[1].timestamp)

  return entries[0]?.[1]
}

interface NovaPoshtaResponse<T> {
  success: boolean
  data: T[]
  errors: string[]
  warnings: string[]
  info: {
    total_count: number
  }
}

interface NovaPoshtaAreaDto {
  Ref: string
  Description: string
}

interface NovaPoshtaCityDto {
  Ref: string
  Description: string
  Area?: string
  AreaRef: string
}

interface NovaPoshtaWarehouseDto {
  Ref: string
  Description: string
  ShortAddress: string
  Number: string
}

interface NovaPoshtaDeliveryCostDto {
  Cost?: string
}

const novaPoshtaApi = axios.create({
  timeout: 10000, // 10 секунд таймаут
  headers: {
    'Content-Type': 'application/json',
  },
})

// Отримати всі області
export const getAreasController = async (request: Request, response: Response) => {
  console.log('getAreasController called')
  try {
    const { q } = request.query
    const cacheKey = `areas:${q || 'all'}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log('Returning cached areas')
      return response.json(cached.data)
    }

    console.log('Fetching areas from Nova Poshta API...')
    const areaResponse = await novaPoshtaApi.post<NovaPoshtaResponse<NovaPoshtaAreaDto>>(NOVA_POSHTA_API_URL, {
      apiKey: NOVA_POSHTA_API_KEY,
      modelName: 'Address',
      calledMethod: 'getAreas',
    })
    console.log('Nova Poshta API response:', areaResponse.data.success ? 'SUCCESS' : 'FAILED')

    if (!areaResponse.data.success) {
      return response.status(400).json({ error: areaResponse.data.errors })
    }

    let areas = areaResponse.data.data.map((area) => ({
      ref: area.Ref,
      description: area.Description,
    }))

    // Фільтрація пошуковим запитом
    if (q && typeof q === 'string' && q.trim().length > 0) {
      const searchQuery = q.toLowerCase()
      areas = areas.filter((area) =>
        area.description.toLowerCase().includes(searchQuery)
      )
    }

    cache.set(cacheKey, { data: areas, timestamp: Date.now() })
    console.log('Returning', areas.length, 'areas')
    response.json(areas)
  } catch (error) {
    console.error('Error fetching areas from Nova Poshta:', error)
    
    // Якщо є кеш, повертаємо його навіть якщо він застарів
    const cached = cache.get(`areas:${request.query.q || 'all'}`) ?? getLatestCacheByPrefix('areas:')
    if (cached) {
      return response.json(cached.data)
    }
    
    response.status(500).json({ error: 'Failed to fetch areas' })
  }
}

// Отримати міста за областю або за пошуковим запитом
export const getCitiesController = async (request: Request, response: Response) => {
  try {
    const { areaRef, q } = request.query
    const cacheKey = `cities:${areaRef || ''}:${q || ''}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return response.json(cached.data)
    }

    const payload = {
      apiKey: NOVA_POSHTA_API_KEY,
      modelName: 'Address',
      calledMethod: 'getCities',
      methodProperties: {
        AreaRef: areaRef || '',
        FindByString: q || '',
      },
    }

    const citiesResponse = await novaPoshtaApi.post<NovaPoshtaResponse<NovaPoshtaCityDto>>(NOVA_POSHTA_API_URL, payload)

    if (!citiesResponse.data.success) {
      return response.status(400).json({ error: citiesResponse.data.errors })
    }

    const cities = citiesResponse.data.data.map((city) => ({
      ref: city.Ref,
      description: city.Description,
      area: city.Area,
      areaRef: city.AreaRef,
    }))

    cache.set(cacheKey, { data: cities, timestamp: Date.now() })
    response.json(cities)
  } catch (error) {
    console.error('Error fetching cities from Nova Poshta:', error)
    
    // Якщо є кеш, повертаємо його навіть якщо він застарів
    const cacheKey = `cities:${request.query.areaRef || ''}:${request.query.q || ''}`
    const cached = cache.get(cacheKey) ?? getLatestCacheByPrefix(`cities:${request.query.areaRef || ''}:`)
    if (cached) {
      return response.json(cached.data)
    }
    
    response.status(500).json({ error: 'Failed to fetch cities' })
  }
}

// Отримати відділення за містом
export const getWarehousesController = async (request: Request, response: Response) => {
  try {
    const { cityRef, q } = request.query

    if (!cityRef) {
      return response.status(400).json({ error: 'cityRef is required' })
    }

    const cacheKey = `warehouses:${cityRef}:${q || ''}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return response.json(cached.data)
    }

    const warehousesResponse = await novaPoshtaApi.post<NovaPoshtaResponse<NovaPoshtaWarehouseDto>>(NOVA_POSHTA_API_URL, {
      apiKey: NOVA_POSHTA_API_KEY,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: cityRef,
      },
    })

    if (!warehousesResponse.data.success) {
      return response.status(400).json({ error: warehousesResponse.data.errors })
    }

    let warehouses = warehousesResponse.data.data.map((warehouse) => ({
      ref: warehouse.Ref,
      description: warehouse.Description,
      shortAddress: warehouse.ShortAddress,
      number: warehouse.Number,
    }))

    // Фільтрація пошуковим запитом
    if (q && typeof q === 'string' && q.trim().length > 0) {
      const searchQuery = q.toLowerCase()
      warehouses = warehouses.filter((warehouse) =>
        warehouse.description.toLowerCase().includes(searchQuery) ||
        warehouse.number.toLowerCase().includes(searchQuery)
      )
    }

    cache.set(cacheKey, { data: warehouses, timestamp: Date.now() })
    response.json(warehouses)
  } catch (error) {
    console.error('Error fetching warehouses from Nova Poshta:', error)
    
    // Якщо є кеш, повертаємо його навіть якщо він застарів
    const cacheKey = `warehouses:${request.query.cityRef}:${request.query.q || ''}`
    const cached = cache.get(cacheKey) ?? getLatestCacheByPrefix(`warehouses:${request.query.cityRef}:`)
    if (cached) {
      return response.json(cached.data)
    }
    
    response.status(500).json({ error: 'Failed to fetch warehouses' })
  }
}

// Розрахувати вартість доставки
export const getDeliveryCostController = async (request: Request, response: Response) => {
  try {
    const { senderCityRef, receiverCityRef, weight = '1' } = request.query

    if (!senderCityRef || !receiverCityRef) {
      return response.status(400).json({ error: 'senderCityRef and receiverCityRef are required' })
    }

    const cacheKey = `delivery:${senderCityRef}:${receiverCityRef}:${weight}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return response.json(cached.data)
    }

    const costResponse = await novaPoshtaApi.post<NovaPoshtaResponse<NovaPoshtaDeliveryCostDto>>(NOVA_POSHTA_API_URL, {
      apiKey: NOVA_POSHTA_API_KEY,
      modelName: 'InternetDocument',
      calledMethod: 'getDocumentPrice',
      methodProperties: {
        senderCityRef,
        receiverCityRef,
        weight: String(weight),
      },
    })

    if (!costResponse.data.success) {
      return response.status(400).json({ error: costResponse.data.errors })
    }

    const costData = { cost: Number(costResponse.data.data[0]?.Cost || '0') }
    
    cache.set(cacheKey, { data: costData, timestamp: Date.now() })
    response.json(costData)
  } catch (error) {
    console.error('Error fetching delivery cost from Nova Poshta:', error)
    response.status(500).json({ error: 'Failed to fetch delivery cost' })
  }
}
