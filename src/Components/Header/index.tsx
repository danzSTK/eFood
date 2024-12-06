import { Container, Hero } from './styles'

import heroImage from '../../assets/images/fundo.png'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { open } from '../../store/reducers/cart'

export type Props = {
  tipo: 'profile' | 'home'
}

function Content({ tipo }: Props) {
  const { items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const openCart = () => {
    dispatch(open())
  }

  const toBackHome = () => {
    if (items.length > 0) {
      return (
        <Link
          to=""
          onClick={() =>
            alert(
              'Você tem que está com o carrinho vazio para voltar a página inicial'
            )
          }
        >
          <img
            src={logo}
            alt="eFood Logo"
            title="Clique aqui para voltar a página inicial"
          />
        </Link>
      )
    } else {
      return (
        <Link to="/">
          <img
            src={logo}
            alt="eFood Logo"
            title="Clique aqui para voltar a página inicial"
          />
        </Link>
      )
    }
  }

  if (tipo === 'home') {
    return (
      <>
        <img src={logo} alt="eFood Logo" />
        <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
      </>
    )
  }
  if (tipo === 'profile') {
    return (
      <>
        <h2>Restaurantes</h2>
        {toBackHome()}
        <button
          type="button"
          onClick={openCart}
          title="Clique aqui para abrir o carrinho"
        >
          <h2>
            <span>{items.length}</span> produto(s) no carrinho
          </h2>
        </button>
      </>
    )
  }

  return null
}

const Header = ({ tipo }: Props) => {
  return (
    <Hero tipo={tipo} style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="container">
        <Container tipo={tipo}>
          <Content tipo={tipo} />
        </Container>
      </div>
    </Hero>
  )
}

export default Header
