import { BrowserRouter } from 'react-router-dom'

import Footer from './Components/Footer'
import Rotas from './routes'
import { GlobalCss } from './styles'
import { ModalProvider } from './context/ModalContext'

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <GlobalCss />
        <Rotas />
        <Footer />
      </BrowserRouter>
    </ModalProvider>
  )
}

export default App
