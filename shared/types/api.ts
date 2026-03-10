export interface ApiResponse<T> {
  data: T
  meta?: {
    message?: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
  }
}
