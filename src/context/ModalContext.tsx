import { createContext, ReactNode, useState } from 'react'

export const ModalContext = createContext({})

interface ModalProvideProps {
  children: ReactNode
}

export const ModalProvider: React.FC<ModalProvideProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const toggleModal = () => {
    setOpenModal(openModal ? false : true)
  }

  return (
    <ModalContext.Provider value={{ openModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}
