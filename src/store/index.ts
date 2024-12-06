import { configureStore } from '@reduxjs/toolkit'
import api from './reducers/api'

import modalSlice from './reducers/modal'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
