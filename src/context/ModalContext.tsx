import { createContext, ReactNode, useState } from 'react'

interface ModalContextProps {
  openModal: boolean
  toggleModal: () => void
  modalID: number | null
  setModalID: (ID: number) => void
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
)

interface ModalProvideProps {
  children: ReactNode
}

export const ModalProvider: React.FC<ModalProvideProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalID, setModalID] = useState<number | null>(null)

  const toggleModal = () => {
    setOpenModal(!openModal)
    document.body.classList.toggle('modal-open')
  }

  return (
    <ModalContext.Provider
      value={{ openModal, toggleModal, modalID, setModalID }}
    >
      {children}
    </ModalContext.Provider>
  )
}
