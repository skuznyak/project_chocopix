export interface CartItem {
  productId: string
  quantity: number
}

export interface CartTotals {
  subtotal: number
  discount: number
  delivery: number
  total: number
}
