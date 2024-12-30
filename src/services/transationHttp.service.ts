import Http from '@/services/http.service'
import { HttpResponse } from '@/models/httpResponse.model'
import { MerchantResponse } from '@/models/merchant.model'
import {
  TransactionResponse,
  TransactionOrderItemResponse,
} from '@/models/transaction.model'
import { CreateTransactionDto } from '@/dtos'

class TransationHttpService {
  private http: Http

  constructor() {
    this.http = new Http()
  }

  async findOneMerchants(): Promise<HttpResponse<MerchantResponse>> {
    const response =
      await this.http.get<HttpResponse<MerchantResponse>>('merchants')
    return response
  }

  async findOneById(id: string): Promise<HttpResponse<TransactionResponse>> {
    const response = await this.http.get<HttpResponse<TransactionResponse>>(
      `/transactions/${id}`,
    )
    return response
  }

  async create(
    dto: CreateTransactionDto,
  ): Promise<HttpResponse<TransactionOrderItemResponse>> {
    const response = await this.http.post<
      HttpResponse<TransactionOrderItemResponse>
    >('/transactions', dto)
    return response
  }
}

export default TransationHttpService
