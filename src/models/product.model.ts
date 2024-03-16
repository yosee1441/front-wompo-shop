type ProductSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
type ProductTypes = 'shirts' | 'pants' | 'hoodies' | 'hats'
type ProductGenders = 'men' | 'women' | 'kid' | 'unisex'

export interface Product {
  id: number
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ProductSizes[]
  slug: string
  tags: string[]
  title: string
  type: ProductTypes
  gender: ProductGenders
}
