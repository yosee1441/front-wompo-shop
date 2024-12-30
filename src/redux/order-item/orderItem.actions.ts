import { createAsyncThunk } from '@reduxjs/toolkit'
import { OrderItemHttp } from '@/modules/order-item/services'

export const findOneById = createAsyncThunk(
  'order-item/findOneById',
  async (paymentTransactionId: string) => {
    const service = new OrderItemHttp()
    const response =
      await service.findOneByPaymentTransactionId(paymentTransactionId)
    return response
  },
)
