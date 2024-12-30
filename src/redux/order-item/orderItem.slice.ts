import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { HttpResponse } from '@/models/httpResponse.model'
import { OrderItem } from '@/modules/order-item/models'
import { findOneById } from './orderItem.actions'

interface OrderState {
  result: OrderItem | null
  loading: boolean
  error: string | null
}

const OrderEmptyState: OrderState = {
  result: null,
  loading: false,
  error: null,
}

const orderItemSlice = createSlice({
  name: 'order-item',
  initialState: OrderEmptyState,
  reducers: {
    resetOrderItem: () => OrderEmptyState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(findOneById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        findOneById.fulfilled,
        (state, action: PayloadAction<HttpResponse<OrderItem>>) => {
          state.loading = false
          state.result = action.payload.data
        },
      )
      .addCase(findOneById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetOrderItem } = orderItemSlice.actions
export default orderItemSlice.reducer
