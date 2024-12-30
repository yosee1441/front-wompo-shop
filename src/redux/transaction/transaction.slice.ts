import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { HttpResponse } from '@/models/httpResponse.model'
import { MerchantResponse, TransactionOrderItemResponse } from '@/models'
import { findOneMerchants, createTransaction } from './transaction.actions'

interface TransactionState {
  merchants: {
    results: MerchantResponse | null
    loading: boolean
    error: string | null
  }
  transaction: {
    results: TransactionOrderItemResponse | null
    loading: boolean
    error: string | null
  }
}

const TransactionEmptyState: TransactionState = {
  merchants: {
    results: null,
    loading: false,
    error: null,
  },
  transaction: {
    results: null,
    loading: false,
    error: null,
  },
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: TransactionEmptyState,
  reducers: {
    resetTransaction: () => TransactionEmptyState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(findOneMerchants.pending, (state) => {
        state.merchants.loading = true
        state.merchants.error = null
      })
      .addCase(
        findOneMerchants.fulfilled,
        (state, action: PayloadAction<HttpResponse<MerchantResponse>>) => {
          state.merchants.loading = false
          state.merchants.results = action.payload.data
        },
      )
      .addCase(findOneMerchants.rejected, (state, action) => {
        state.merchants.loading = false
        state.merchants.error = action.payload as string
      })
      .addCase(createTransaction.pending, (state) => {
        state.transaction.loading = true
        state.transaction.error = null
      })
      .addCase(
        createTransaction.fulfilled,
        (
          state,
          action: PayloadAction<HttpResponse<TransactionOrderItemResponse>>,
        ) => {
          state.transaction.loading = false
          state.transaction.results = action.payload.data
        },
      )
      .addCase(createTransaction.rejected, (state, action) => {
        state.transaction.loading = false
        state.transaction.error = action.payload as string
      })
  },
})

export const { resetTransaction } = transactionSlice.actions
export default transactionSlice.reducer
