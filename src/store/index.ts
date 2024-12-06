import { configureStore } from '@reduxjs/toolkit'
import api from './reducers/api'

import modalSlice from './reducers/modal'
import cartSlice from './reducers/cart'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    modal: modalSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
