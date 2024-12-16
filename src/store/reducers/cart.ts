import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cardapio } from '../../pages/Home'

type CartState = {
  items: Cardapio[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false
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
    },
    open: (state) => {
      state.isOpen = true
      document.querySelector('body')!.style.overflow = 'hidden'
    },
    close: (state) => {
      state.isOpen = false
      document.querySelector('body')!.style.overflow = 'auto'
    },
    clear: (state) => {
      state.items = []
    }
  }
})

export const { add, remove, open, close, clear } = cartSlice.actions
export default cartSlice.reducer
