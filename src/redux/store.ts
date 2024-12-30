import { configureStore } from '@reduxjs/toolkit'

import { productReducer } from './product'
import { orderReducer } from './order'
import { authUserReducer } from './auth'
import { transactionReducer } from './transaction'
import { orderItemReducer } from './order-item'

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    authUser: authUserReducer,
    transaction: transactionReducer,
    orderItem: orderItemReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
