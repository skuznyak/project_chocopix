import type { Request, Response } from 'express'

const cities = ['Київ', 'Львів', 'Одеса', 'Дніпро', 'Івано-Франківськ', 'Вінниця']
const warehouses: Record<string, string[]> = {
  Київ: ['Відділення №12', 'Поштомат №41'],
  Львів: ['Відділення №7', 'Відділення №22'],
  Одеса: ['Відділення №3', 'Поштомат №9'],
}

export const getCitiesController = (request: Request, response: Response) => {
  const query = typeof request.query.q === 'string' ? request.query.q.toLowerCase() : ''
  response.json(cities.filter((city) => city.toLowerCase().includes(query)))
}

export const getWarehousesController = (request: Request, response: Response) => {
  const city = typeof request.query.city === 'string' ? request.query.city : ''
  response.json(warehouses[city] ?? [])
}
