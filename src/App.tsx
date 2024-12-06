import { BrowserRouter } from 'react-router-dom'

import Footer from './Components/Footer'
import Rotas from './routes'
import { GlobalCss } from './styles'
import { ModalProvider } from './context/ModalContext'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalCss />
        <Rotas />
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
