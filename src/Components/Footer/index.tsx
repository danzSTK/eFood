import { Link } from 'react-router-dom'

import { Content, FooterContent, SocialMidia } from './styles'

import logo from '../../assets/images/logo.png'
import fundo from '../../assets/images/fundo.png'

const Footer = () => (
  <FooterContent style={{ backgroundImage: `url(${fundo})` }}>
    <div className="container">
      <Content>
        <Link to="/">
          <img src={logo} alt="Logo eFood" />
        </Link>
        <SocialMidia>
          <li>
            <a href="#" title="Nos acompanhe no Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Nos acompanhe no Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Nos acompanhe no Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
        </SocialMidia>
      </Content>
      <p>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.
      </p>
    </div>
  </FooterContent>
)

export default Footer
