import { useGetRestaurantesQuery } from '../../store/reducers/api'

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
  const {
    data: listaRestaurantes,
    error: erroListaRestaurantes,
    isLoading: carregandoListaRestaurantes
  } = useGetRestaurantesQuery()

  if (carregandoListaRestaurantes) {
    return (
      <>
        <Header tipo="home" />
        <h2>Carregando...</h2>
      </>
    )
  }

  if (erroListaRestaurantes) {
    return (
      <>
        <Header tipo="home" />
        <h2>Opps! Parece que nao conseguimos acesso.</h2>
      </>
    )
  }

  return (
    <>
      <Header tipo="home" />
      <ProductList tipo="home" listaRestaurantes={listaRestaurantes} />
    </>
  )
}

export default Home

//https://fake-api-tau.vercel.app/api/efood/
