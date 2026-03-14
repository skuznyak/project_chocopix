import axios from 'axios'

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const resolveApiBaseUrl = () => {
  const raw = (import.meta.env.VITE_API_URL ?? '/api').trim().replace(/\/+$/, '')

  if (!raw) {
    return '/api'
  }

  // Backward compatibility: when VITE_API_URL is host-only (e.g. http://localhost:3000),
  // append /api because backend routes are mounted under /api/*.
  if (!raw.endsWith('/api')) {
    return `${raw}/api`
  }

  return raw
}

const API_BASE_URL = resolveApiBaseUrl()

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
