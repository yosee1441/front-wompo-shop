import Http from '@/services/http.service'
import { HttpResponse } from '@/models/httpResponse.model'
import { OrderItem } from '@/modules/order-item/models'

class OrderItemHttpService {
  private http: Http

  constructor() {
    this.http = new Http()
  }

  async findOneByPaymentTransactionId(
    paymentTransactionId: string,
  ): Promise<HttpResponse<OrderItem>> {
    const response = await this.http.patch<HttpResponse<OrderItem>>(
      `order-item/${paymentTransactionId}`,
    )
    return response
  }
}

export default OrderItemHttpService
