import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem, CartTotals, Product } from '@chocopix/shared'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  promoCode?: string
  promoDiscount: number
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  setPromoCode: (code?: string, discount?: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotals: (products: Product[]) => CartTotals
}

export const FREE_DELIVERY_THRESHOLD = 2000
const CART_STORAGE_KEY = 'chocopix-cart'

const isCartItem = (value: unknown): value is CartItem =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as CartItem).productId === 'string' &&
  typeof (value as CartItem).quantity === 'number' &&
  Number.isFinite((value as CartItem).quantity) &&
  (value as CartItem).quantity > 0

const sanitizeCartState = (state: Partial<CartState> | undefined) => ({
  items: Array.isArray(state?.items) ? state.items.filter(isCartItem) : [],
  isOpen: false,
  promoCode: typeof state?.promoCode === 'string' && state.promoCode.startsWith('CHOCO')
    ? state.promoCode
    : undefined,
  promoDiscount:
    typeof state?.promoDiscount === 'number' && Number.isFinite(state.promoDiscount) && state.promoDiscount > 0
      ? state.promoDiscount
      : 0,
})

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: undefined,
      promoDiscount: 0,
      addItem: (productId) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === productId)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }

          return {
            items: [...state.items, { productId, quantity: 1 }],
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),
      setPromoCode: (code, discount = 0) => {
        const normalizedCode = code?.trim().toUpperCase()
        const hasValidCode = Boolean(normalizedCode && normalizedCode.startsWith('CHOCO'))
        const normalizedDiscount = Number.isFinite(discount) && discount > 0 ? Math.round(discount) : 0

        set({
          promoCode: hasValidCode ? normalizedCode : undefined,
          promoDiscount: hasValidCode ? normalizedDiscount : 0,
        })
      },
      clearCart: () => set({ items: [], promoCode: undefined, promoDiscount: 0, isOpen: false }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotals: (products) => {
        const { items, promoDiscount } = get()
        const subtotal = items.reduce((sum, item) => {
          const product = products.find((entry) => entry.id === item.productId)
          return sum + (product?.price ?? 0) * item.quantity
        }, 0)
        const discount = Math.min(promoDiscount, subtotal)
        const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0
        const delivery = 0

        return {
          subtotal,
          discount,
          delivery,
          isFreeDelivery,
          total: subtotal - discount + delivery,
        }
      },
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...sanitizeCartState(persistedState as Partial<CartState> | undefined),
      }),
    },
  ),
)
