import HttpClient from '@/services/httpClient.service'
import { Purchase } from '@/models'
import { CreatePurchaseDto } from '@/dtos'

class PurchasedHttpService {
  private http: HttpClient

  constructor() {
    this.http = new HttpClient()
  }

  async findOne(id: Purchase['id']): Promise<Purchase> {
    const response = await this.http.get<Purchase>(`purchase/${id}`)
    return response
  }

  async create(dto: CreatePurchaseDto): Promise<Purchase> {
    const response = await this.http.post<Purchase>(`purchase`, dto)
    return response
  }
}

export default PurchasedHttpService
