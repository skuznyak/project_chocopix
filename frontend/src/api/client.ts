import axios from 'axios'

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
})
