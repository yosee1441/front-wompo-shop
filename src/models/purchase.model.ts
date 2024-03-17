import { Product } from './product.model'

export interface Purchase {
  id: number,
  productId: Product['slug']
  cardNumber: string,
  name: string,
  expirationDate: string,
  cvv: string,
  documentNumber: string,
  typeDocument: string,
  price?: number
  product?: Product
}
