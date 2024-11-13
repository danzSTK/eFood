import styled from 'styled-components'
import { cores } from '../../styles'

export const FooterContent = styled.footer`
  padding: 40px 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .container {
    & > p {
      display: block;
      margin: 0 auto;
      max-width: 480px;
      text-align: center;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
    }
  }
`

export const Content = styled.div`
  img {
    display: block;
    margin: 0 auto;
  }
`

export const SocialMidia = styled.ul`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  padding-bottom: 80px;

  li {
    a {
      color: ${cores.branco};
      background-color: ${cores.corPrincipal};
      color: ${cores.branco};
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 16px;
      border-radius: 50%;
      text-decoration: none;
    }
  }
`
