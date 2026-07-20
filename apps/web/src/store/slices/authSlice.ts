import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  uid: string | null
  email: string | null
  name: string | null
  username: string | null
  coins: number
  isAuthenticated: boolean
  loading: boolean
}

const initialState: UserState = {
  uid: null,
  email: null,
  name: null,
  username: null,
  coins: 0,
  isAuthenticated: false,
  loading: true, // Initially true while Firebase checks auth state
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      state.uid = action.payload.uid ?? state.uid
      state.email = action.payload.email ?? state.email
      state.name = action.payload.name ?? state.name
      state.username = action.payload.username ?? state.username
      state.coins = action.payload.coins ?? state.coins
      state.isAuthenticated = true
      state.loading = false
    },
    clearUser: (state) => {
      state.uid = null
      state.email = null
      state.name = null
      state.username = null
      state.coins = 0
      state.isAuthenticated = false
      state.loading = false
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    updateCoins: (state, action: PayloadAction<number>) => {
      state.coins = action.payload
    }
  },
})

export const { setUser, clearUser, setAuthLoading, updateCoins } = authSlice.actions
export default authSlice.reducer
