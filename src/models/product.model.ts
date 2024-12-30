export interface Product {
  id: number
  title: string
  description: string
  price: number
  discount: number
  iva: number
  slug: string
  type: string
  gender: string
  createdAt: string
  updatedAt: string
  images: Image[]
  sizes: Size[]
  tags: Size[]
  stocks: Stock[]
  availableStock: number
  availableSize: number
}

interface Stock {
  id: number
  availableQuantity: number
  size: Size
  warehouse: string
  createdAt: string
  updatedAt: string
}

export interface Size {
  id: number
  stockQuantity: number
  name: string
  stocks: Stock[]
  createdAt: string
  updatedAt: string
}

export interface Image {
  id: number
  url: string
  createdAt: string
  updatedAt: string
}
