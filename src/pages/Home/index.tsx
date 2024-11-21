import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import ProductList from '../../Components/Product-List'

export type Cardapio = {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
}

export type Restaurante = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: Cardapio[]
}

const Home = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>()

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => setRestaurantes(res))
  }, [])

  if (!restaurantes) return <h2>Carregando...</h2>
  return (
    <>
      <Header tipo="home" />
      <ProductList tipo="home" restaurantes={restaurantes} />
    </>
  )
}

export default Home

//https://fake-api-tau.vercel.app/api/efood/
