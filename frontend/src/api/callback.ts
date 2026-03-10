import { apiClient, USE_MOCK } from './client'
import { readStorage, writeStorage } from '@/utils/browserStorage'

export interface CreateCallbackPayload {
  name: string
  phone: string
  comment?: string
}

const STORAGE_KEY = 'chocopix-callback-requests'

interface CallbackRequestRecord extends CreateCallbackPayload {
  id: string
  createdAt: string
}

const readCallbackRequests = (): CallbackRequestRecord[] => readStorage<CallbackRequestRecord[]>(STORAGE_KEY, [])

export const createCallbackRequest = async (payload: CreateCallbackPayload) => {
  if (USE_MOCK) {
    const callbackRequest: CallbackRequestRecord = {
      id: crypto.randomUUID(),
      name: payload.name,
      phone: payload.phone,
      comment: payload.comment,
      createdAt: new Date().toISOString(),
    }

    const requests = readCallbackRequests()
    writeStorage(STORAGE_KEY, [callbackRequest, ...requests])

    return { success: true }
  }

  const { data } = await apiClient.post<{ success: boolean }>('/api/callback', payload)
  return data
}
