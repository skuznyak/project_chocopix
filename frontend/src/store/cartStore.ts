import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem, CartTotals, Product } from '@chocopix/shared'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  promoCode?: string
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  applyPromoCode: (code: string) => boolean
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotals: (products: Product[]) => CartTotals
}

export const FREE_DELIVERY_THRESHOLD = 2000
const PROMO_CODE = 'CHOCO10'
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
  promoCode: state?.promoCode === PROMO_CODE ? state.promoCode : undefined,
})

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: undefined,
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
      applyPromoCode: (code) => {
        const normalizedCode = code.trim().toUpperCase()
        const isValid = normalizedCode === PROMO_CODE

        set({ promoCode: isValid ? normalizedCode : undefined })
        return isValid
      },
      clearCart: () => set({ items: [], promoCode: undefined, isOpen: false }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotals: (products) => {
        const { items, promoCode } = get()
        const subtotal = items.reduce((sum, item) => {
          const product = products.find((entry) => entry.id === item.productId)
          return sum + (product?.price ?? 0) * item.quantity
        }, 0)
        const discount = promoCode ? Math.round(subtotal * 0.1) : 0
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
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...sanitizeCartState(persistedState as Partial<CartState> | undefined),
      }),
    },
  ),
)
