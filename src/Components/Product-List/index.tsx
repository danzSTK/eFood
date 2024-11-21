import { Props as styleProps } from '../Card/styles' // Será o tipo de designer do card
import { Restaurante } from '../../pages/Home' // recebendo a resposta da api atravez de props

import { Products } from './styles'
import Product from '../Card'

interface Props extends styleProps {
  restaurantes: Restaurante[]
}

const ProductList = ({ tipo, restaurantes }: Props) => {
  function ProductsContent() {
    if (tipo === 'home') {
      return (
        <Products tipo="home">
          {restaurantes.map((restaurante) => (
            <Product
              id={restaurante.id}
              image={restaurante.capa}
              title={restaurante.titulo}
              description={restaurante.descricao}
              nota={restaurante.avaliacao}
              infos={[`${restaurante.tipo}`, `${restaurante.destacado}`]}
              tipo="home"
              key={restaurante.id}
            />
          ))}
        </Products>
      )
    }

    if (tipo === 'profile') {
      return (
        <Products tipo="profile">
          {/*
          <Product
            image={pizzaImage}
            description="A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!"
            infos={['']}
            title="Pizza Marguerita"
            id={1}
            tipo="profile"
          />
          <Product
            image={pizzaImage}
            description="A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!"
            infos={['']}
            title="Pizza Marguerita"
            id={1}
            tipo="profile"
          />
          <Product
            image={pizzaImage}
            description="A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!"
            infos={['']}
            title="Pizza Marguerita"
            id={1}
            tipo="profile"
          />
          <Product
            image={pizzaImage}
            description="A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!"
            infos={['']}
            title="Pizza Marguerita"
            id={1}
            tipo="profile"
          />
          <Product
            image={pizzaImage}
            description="A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!"
            infos={['']}
            title="Pizza Marguerita"
            id={1}
            tipo="profile"
          />
          <Product
            image={pizzaImage}
            description="A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!"
            infos={['']}
            title="Pizza Marguerita"
            id={1}
            tipo="profile"
          /> */}
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
