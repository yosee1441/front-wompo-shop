import { ThunkDispatch, Reducer } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: () => ({}),
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

const combinedReducer: Reducer<RootState, AnyAction> = (state, action) => {
  return rootReducer(state, action)
}

export default combinedReducer
