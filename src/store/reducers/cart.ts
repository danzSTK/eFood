import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cardapio } from '../../pages/Home'

type CartState = {
  items: Cardapio[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Cardapio>) => {
      const produto = state.items.find((item) => item.id === action.payload.id)

      if (!produto) {
        state.items.push(action.payload)
      } else alert('Esse produto já está no carrinho')
    },
    remove: (state, aciton: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== aciton.payload)
    }
  }
})
