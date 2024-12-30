import { HttpResponse } from '@/models/httpResponse.model'
import { Product } from '@/models'

export const calculateAvailableStockAdapter = (response: HttpResponse<Product>) => {
  if(!response?.data) return response

  response.data.availableStock = response.data?.stocks.reduce(
    (acc, stock) => acc + stock.availableQuantity,
    0,
  )

  response.data.availableSize = response.data?.sizes.reduce(
    (acc, size) => acc + size.stockQuantity,
    0,
  )

  return response
}
