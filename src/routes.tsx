import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import LojaProfile from './pages/Profile'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/profile/:id" element={<LojaProfile />} />
  </Routes>
)

export default Rotas
