// Precisa de um tratamento de erro melhor.
import { useParams } from 'react-router-dom'

import {
  useGetRestauranteQuery,
  useGetRestaurantesQuery
} from '../../store/reducers/api'

import { Props as styleProps } from '../Card/styles' // Será o tipo de designer do card

import { Products } from './styles'
import Product from '../Card'

const ProductList = ({ tipo }: styleProps) => {
  const { id } = useParams() // Usado somente quando for do tipo profile, preciso saber qual é o restaurante e será assim que irei descobrir

  const {
    data: Listarestaurantes,
    error: erroListaRestaurantes,
    isLoading: carregandoListaRestaurantes
  } = useGetRestaurantesQuery() // Aqui estou recebendo uma lista de restaurantes/resposta da api

  const {
    data: restaurante,
    error: restauranteErro,
    isLoading: carregandoRestaurante
  } = useGetRestauranteQuery(String(id)) // aqui será usado, até o momento, somente quando for do tipo profile é assim que irei exibir informações do restaurante

  function ProductsContent() {
    if (carregandoListaRestaurantes) <h2>Carregando..</h2>
    if (erroListaRestaurantes)
      <h2>Desculpe, não foi possível acessar os restaurantes</h2>

    if (tipo === 'home') {
      return (
        <Products tipo="home">
          {Listarestaurantes?.map((restaurante) => (
            <Product
              id={restaurante.id}
              image={restaurante.capa}
              title={restaurante.titulo}
              description={restaurante.descricao}
              nota={restaurante.avaliacao}
              infos={[`${restaurante.tipo}`]}
              tipo="home"
              key={restaurante.id}
              destacado={restaurante.destacado}
            />
          ))}
        </Products>
      )
    }

    if (tipo === 'profile') {
      if (carregandoRestaurante) <h2>Carregando...</h2>

      if (restauranteErro)
        <h2>Desculpe, não foi possível acessar esse restaurante</h2>

      const cardapios = restaurante?.cardapio

      return (
        <Products tipo="profile">
          {cardapios?.map((cardapio) => (
            <Product
              id={cardapio.id}
              title={cardapio.nome}
              image={cardapio.foto}
              description={cardapio.descricao}
              infos={[]}
              tipo="profile"
              key={cardapio.id}
            />
          ))}
        </Products>
      )
    }
    return null
  }

  return (
    <div className="container">
      <ProductsContent />
    </div>
  )
}

export default ProductList
