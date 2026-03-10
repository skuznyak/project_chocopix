import type { Request, Response } from 'express'
import { productsMock } from '../services/mockProducts.js'

export const getProductsController = (request: Request, response: Response) => {
  const { category, flavor, sort } = request.query

  const filteredProducts = productsMock
    .filter((product) => {
      if (typeof category === 'string' && product.category !== category) {
        return false
      }

      if (typeof flavor === 'string' && product.flavor !== flavor) {
        return false
      }

      return true
    })
    .sort((left, right) => {
      if (sort === 'price-asc') {
        return left.price - right.price
      }

      if (sort === 'price-desc') {
        return right.price - left.price
      }

      return right.popularity - left.popularity
    })

  response.json(filteredProducts)
}

export const getProductByIdController = (request: Request, response: Response) => {
  const product = productsMock.find(
    (item) => item.id === request.params.id || item.slug === request.params.id,
  )

  if (!product) {
    response.status(404).json({ message: 'Product not found' })
    return
  }

  response.json(product)
}
