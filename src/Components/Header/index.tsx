import { Container, Hero } from './styles'

import heroImage from '../../assets/images/fundo.png'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export type Props = {
  tipo: 'profile' | 'home'
}

function Content({ tipo }: Props) {
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
        <Link to="/">
          <img src={logo} alt="eFood Logo" />
        </Link>
        <h2>
          <span id="">0</span> produto(s) no carrinho
        </h2>
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
