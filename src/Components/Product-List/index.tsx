import Product from '../Card'
import { Products } from './styles'
import { Props } from '../Card/styles'

import sushiImage from '../../assets/images/imagem (2).png'
import macarraoImage from '../../assets/images/image 1.png'
import pizzaImage from '../../assets/images/pizza.png'

const ProductList = ({ tipo }: Props) => {
  function ProductsContent() {
    if (tipo === 'home') {
      return (
        <Products tipo="home">
          <Product
            image={sushiImage}
            description="Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!"
            infos={['Destaque da semana', 'Japonesa']}
            nota={4.9}
            title="Hioki Sushi"
            id={1}
            tipo="home"
          />

          <Product
            image={macarraoImage}
            description="A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!"
            infos={['Italiana']}
            nota={4.6}
            title="La Dolce Vita Trattoria"
            id={2}
            tipo="home"
          />

          <Product
            image={sushiImage}
            description="Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!"
            infos={['Destaque da semana', 'Japonesa']}
            nota={4.9}
            title="Hioki Sushi"
            id={1}
            tipo="home"
          />

          <Product
            image={macarraoImage}
            description="A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!"
            infos={['Italiana']}
            nota={4.6}
            title="La Dolce Vita Trattoria"
            id={2}
            tipo="home"
          />

          <Product
            image={sushiImage}
            description="Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!"
            infos={['Destaque da semana', 'Japonesa']}
            nota={4.9}
            title="Hioki Sushi"
            id={1}
            tipo="home"
          />

          <Product
            image={macarraoImage}
            description="A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!"
            infos={['Italiana']}
            nota={4.6}
            title="La Dolce Vita Trattoria"
            id={2}
            tipo="home"
          />
        </Products>
      )
    }

    if (tipo === 'profile') {
      return (
        <Products tipo="profile">
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
          />
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
