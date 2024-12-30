import Http from '@/services/http.service'
import { HttpResponse } from '@/models/httpResponse.model'
import { Product } from '@/models/product.model'
import { Pagination } from '@/models/pagination.model'

class ProductHttpService {
  private http: Http

  constructor() {
    this.http = new Http()
  }

  async findAll(): Promise<HttpResponse<Pagination<Product[]>>> {
    const response =
      await this.http.get<HttpResponse<Pagination<Product[]>>>('product')
    return response
  }
}

export default ProductHttpService
