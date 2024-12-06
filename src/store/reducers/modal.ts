import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModalState = {
  isOpen: boolean
  id: number | string | undefined
}

const initialState: ModalState = {
  isOpen: false,
  id: undefined
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<number | string>) => {
      state.isOpen = true
      state.id = action.payload
      document.querySelector('body')?.classList.add('modal-open')
    },
    close: (state) => {
      state.isOpen = false
      document.querySelector('body')?.classList.remove('modal-open')
    }
  }
})

export const { open, close } = modalSlice.actions
export default modalSlice.reducer
