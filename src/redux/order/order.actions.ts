import { createAsyncThunk } from '@reduxjs/toolkit'
import { OrderHttpService } from '@/modules/order/services'

export const findOneProductBySlug = createAsyncThunk(
  'order/findOneProductBySlug',
  async (slug: string) => {
    const service = new OrderHttpService()
    const response = await service.findOneBySlug(slug)
    return response
  },
)
