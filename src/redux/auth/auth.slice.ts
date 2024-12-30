import { createSlice } from '@reduxjs/toolkit'
import { AuthUser } from '@/models'

interface AuthState {
  result: AuthUser | null
  loading: boolean
  error: string | null
}

const AuthEmptyState: AuthState = {
  result: {
    id: 1,
    name: 'Juan Alfonso Pérez Rodríguez',
    email: 'example@wompi.co',
    address: 'Calle 34 # 56 - 78',
    phone: '573307654321',
    country: 'CO',
    region: 'Cundinamarca',
    city: 'Bogotá',
    legalId: '1234567890',
    legalIdType: 'CC',
    currency: 'COP',
  },
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthEmptyState,
  reducers: {
    resetAuth: () => AuthEmptyState,
  },
})

export default authSlice.reducer
