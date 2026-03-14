import { useMemo } from 'react'
import { useCartStore } from '@/store/cartStore'
import { productsMock } from '@/data/products.mock'

export const useCart = () => {
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const setPromoCode = useCartStore((state) => state.setPromoCode)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotals = useCartStore((state) => state.getTotals)

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => ({
          item,
          product: productsMock.find((product) => product.id === item.productId),
        }))
        .filter((entry): entry is { item: (typeof items)[number]; product: (typeof productsMock)[number] } =>
          Boolean(entry.product),
        ),
    [items],
  )

  return {
    items,
    detailedItems,
    promoCode,
    totals: getTotals(productsMock),
    addItem,
    removeItem,
    setQuantity,
    setPromoCode,
    clearCart,
  }
}
