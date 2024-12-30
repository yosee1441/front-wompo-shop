import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { HttpResponse } from '@/models/httpResponse.model'
import { Product } from '@/models/product.model'
import { Pagination } from '@/models/pagination.model'
import { findAllProducts } from './product.actions'

interface ProductState {
  results: Product[] | null
  meta: {
    total: number
    limit: number
  }
  loading: boolean
  error: string | null
}

const ProductEmptyState: ProductState = {
  results: [],
  meta: {
    total: 0,
    limit: 10,
  },
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState: ProductEmptyState,
  reducers: {
    resetProduct: () => ProductEmptyState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(findAllProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        findAllProducts.fulfilled,
        (state, action: PayloadAction<HttpResponse<Pagination<Product[]>>>) => {
          state.loading = false
          state.results = action.payload.data.results
          state.meta = action.payload.data.meta
        },
      )
      .addCase(findAllProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetProduct } = productSlice.actions
export default productSlice.reducer
