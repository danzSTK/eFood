// Precisa de um tratamento de erro melhor.

import { Props as styleProps } from '../Card/styles' // Será o tipo de designer do card

import { Products } from './styles'
import Product from '../Card'
import { Cardapio, Restaurante } from '../../pages/Home'

interface Props extends styleProps {
  listaRestaurantes?: Restaurante[]
  cardapios?: Cardapio[]
}

const ProductList = ({ tipo, listaRestaurantes, cardapios }: Props) => {
  function ProductsContent() {
    if (tipo === 'home') {
      return (
        <Products tipo="home">
          {listaRestaurantes?.map((restaurante) => (
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
