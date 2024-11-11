import { Container, Hero } from './styles'

import heroImage from '../../assets/images/fundo.png'
import logo from '../../assets/images/logo.png'

const Header = () => (
  <Hero style={{ backgroundImage: `url(${heroImage})` }}>
    <div className="container">
      <Container>
        <img src={logo} alt="eFood Logo" />
        <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
      </Container>
    </div>
  </Hero>
)

export default Header
