const NOVA_POSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/'
const NOVA_POSHTA_API_KEY = process.env.NOVA_POSHTA_API_KEY || 'b092aa17ef8c57c5f163db33d5507598'

interface NovaPoshtaRequest {
  apiKey: string
  modelName: string
  calledMethod: string
  methodProperties?: Record<string, unknown>
}

const novaPoshtaRequest = async <T>(payload: NovaPoshtaRequest): Promise<T> => {
  const response = await fetch(NOVA_POSHTA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      apiKey: NOVA_POSHTA_API_KEY,
    }),
    signal: AbortSignal.timeout(15_000),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Nova Poshta API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()

  if (data.errors && data.errors.length > 0) {
    throw new Error(`Nova Poshta API errors: ${data.errors.join(', ')}`)
  }

  return data as T
}

export interface Area {
  Ref: string
  Description: string
}

export interface City {
  Ref: string
  Description: string
  AreaDescription: string
  AreaRef: string
}

export interface Warehouse {
  Ref: string
  Description: string
  SiteKey: string
  Number: string
  CityRef: string
}

interface NovaPoshtaResponse<T> {
  success: boolean
  data: T[]
  errors?: string[]
  warnings?: string[]
  info?: {
    'total count'?: number
  }
}

export const getAreas = async (): Promise<Area[]> => {
  const data = await novaPoshtaRequest<NovaPoshtaResponse<Area>>({
    apiKey: NOVA_POSHTA_API_KEY,
    modelName: 'Address',
    calledMethod: 'getAreas',
  })

  return data.data ?? []
}

export const getCities = async (areaRef?: string): Promise<City[]> => {
  const methodProperties: Record<string, unknown> = {}
  if (areaRef) {
    methodProperties.AreaRef = areaRef
  }

  const data = await novaPoshtaRequest<NovaPoshtaResponse<City>>({
    apiKey: NOVA_POSHTA_API_KEY,
    modelName: 'Address',
    calledMethod: 'getCities',
    methodProperties,
  })

  return data.data ?? []
}

export const getWarehouses = async (cityRef: string): Promise<Warehouse[]> => {
  const data = await novaPoshtaRequest<NovaPoshtaResponse<Warehouse>>({
    apiKey: NOVA_POSHTA_API_KEY,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityRef: cityRef,
    },
  })

  return data.data ?? []
}

export const searchCities = async (query: string): Promise<City[]> => {
  const data = await novaPoshtaRequest<NovaPoshtaResponse<City>>({
    apiKey: NOVA_POSHTA_API_KEY,
    modelName: 'Address',
    calledMethod: 'searchByAddress',
    methodProperties: {
      SearchString: query,
    },
  })

  return data.data ?? []
}
