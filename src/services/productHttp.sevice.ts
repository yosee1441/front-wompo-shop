import HttpClient from '@/services/httpClient.service'
import { Product } from '@/models/product.model'

class ProductHttpService {
  private http: HttpClient

  constructor() {
    this.http = new HttpClient()
  }

  async findAll(): Promise<Product[]> {
    const response = await this.http.get<Product[]>('product')
    return response
  }

  async findOne(slug: Product['slug']): Promise<Product> {
    const response = await this.http.get<Product>(`product/${slug}`)
    return response
  }
}

export default ProductHttpService
