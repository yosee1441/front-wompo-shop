import { createAsyncThunk } from '@reduxjs/toolkit'
import { TransactionHttpService } from '@/services'
import { CreateTransactionDto } from '@/dtos'

export const findOneMerchants = createAsyncThunk(
  'transaction/findOneMerchants',
  async () => {
    const service = new TransactionHttpService()
    const response = await service.findOneMerchants()
    return response
  },
)

export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (dto: CreateTransactionDto) => {
    const service = new TransactionHttpService()
    const response = await service.create(dto)
    return response
  },
)
