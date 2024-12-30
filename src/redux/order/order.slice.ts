import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { HttpResponse } from '@/models/httpResponse.model'
import { Product } from '@/models/product.model'
import { findOneProductBySlug } from './order.actions'

interface OrderState {
  result: Product | null
  loading: boolean
  error: string | null
}

const OrderEmptyState: OrderState = {
  result: null,
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: OrderEmptyState,
  reducers: {
    showLoading: (state) => {
      state.loading = true
    },
    hiddenLoading: (state) => {
      state.loading = false
    },
    resetOrder: () => OrderEmptyState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(findOneProductBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        findOneProductBySlug.fulfilled,
        (state, action: PayloadAction<HttpResponse<Product>>) => {
          state.loading = false
          state.result = action.payload.data
        },
      )
      .addCase(findOneProductBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetOrder, showLoading, hiddenLoading } = orderSlice.actions
export default orderSlice.reducer
