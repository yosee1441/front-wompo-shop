export type ProductSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type ProductTypes = 'shirts' | 'pants' | 'hoodies' | 'hats'
export type ProductGenders = 'men' | 'women' | 'kid' | 'unisex'

export interface Product {
  slug: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ProductSizes[]
  tags: string[]
  title: string
  type: ProductTypes
  gender: ProductGenders
}
