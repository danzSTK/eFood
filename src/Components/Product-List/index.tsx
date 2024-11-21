import { Props as styleProps } from '../Card/styles' // Será o tipo de designer do card
import { Cardapio, Restaurante } from '../../pages/Home' // recebendo a resposta da api atravez de props

import { Products } from './styles'
import Product from '../Card'

interface Props extends styleProps {
  restaurantes?: Restaurante[]
  cardapios?: Cardapio[]
}

const ProductList = ({ tipo, restaurantes, cardapios }: Props) => {
  function ProductsContent() {
    if (tipo === 'home') {
      if (!restaurantes) return <h2>Carregando...</h2>
      return (
        <Products tipo="home">
          {restaurantes.map((restaurante) => (
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
      if (!cardapios) return <h2>Carregando...</h2>
      return (
        <Products tipo="profile">
          {cardapios.map((cardapio) => (
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
