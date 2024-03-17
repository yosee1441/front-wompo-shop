import { createAsyncThunk } from '@reduxjs/toolkit'
import ProductHttpService from '@/services/productHttp.sevice'
import { Product } from '@/models/product.model'

export const findAllProducts = createAsyncThunk(
  'product/findAllProducts',
  async () => {
    const service = new ProductHttpService()
    const response = await service.findAll()
    return response
  },
)

export const findOneProduct = createAsyncThunk(
  'product/findOneProduct',
  async (slug: Product['slug']) => {
    const service = new ProductHttpService()
    const response = await service.findOne(slug)
    return response
  },
)
