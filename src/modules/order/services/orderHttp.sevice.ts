import Http from '@/services/http.service'
import { HttpResponse } from '@/models/httpResponse.model'
import { Product } from '@/models/product.model'
import { calculateAvailableStockAdapter } from '@/modules/order/adatpers'

class OrderHttpService {
  private http: Http

  constructor() {
    this.http = new Http()
  }

  async findOneBySlug(slug: Product['slug']): Promise<HttpResponse<Product>> {
    const response = await this.http.get<HttpResponse<Product>>(
      `product/${slug}`,
    )
    return calculateAvailableStockAdapter(response)
  }
}

export default OrderHttpService
