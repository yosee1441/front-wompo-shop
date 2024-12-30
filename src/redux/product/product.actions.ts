import { createAsyncThunk } from '@reduxjs/toolkit'
import ProductHttpService from '@/services/productHttp.sevice'

export const findAllProducts = createAsyncThunk(
  'product/findAllProducts',
  async () => {
    const service = new ProductHttpService()
    const response = await service.findAll()
    return response
  },
)
