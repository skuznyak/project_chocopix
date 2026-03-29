export type ProductBadge = 'hit' | 'new' | 'sale'

export type ProductCategory = 'classic' | 'premium' | 'gift-set' | 'cups' | 'marshmallow'

export type ProductCatalogType = 'bombочки' | 'набори' | 'чашки'

export interface ProductImage {
  id: string
  src: string
  alt: string
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  composition: string[]
  weight: number
  flavor: string
  price: number
  previousPrice?: number
  badge?: ProductBadge
  category: ProductCategory
  tags: string[]
  popularity: number
  images: ProductImage[]
  featured?: boolean
}
