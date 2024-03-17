import { createAsyncThunk } from '@reduxjs/toolkit'
import { PurchasedHttpService } from '@/services'
import { Purchase } from '@/models/purchase.model'
import { CreatePurchaseDto } from '@/dtos'

export const createPurchase = createAsyncThunk(
  'purchase/createPurchase',
  async (dto: CreatePurchaseDto) => {
    const service = new PurchasedHttpService()
    const response = await service.create(dto)
    return response
  },
)

export const findOnePurchase = createAsyncThunk(
  'purchase/findOnePurchase',
  async (id: Purchase['id']) => {
    const service = new PurchasedHttpService()
    const response = await service.findOne(id)
    return response
  },
)
