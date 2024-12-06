import styled, { createGlobalStyle } from 'styled-components'
import { Props } from './Components/Card/styles'

export const cores = {
  branco: '#FFF8F2',
  corPrincipal: '#E66767',
  corSecundaria: '#FFEBD9',
  amarelo: '#FFB930'
}

export const GlobalCss = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: Roboto, sans-serif;
  }

  body {
    background-color: ${cores.branco};
    color: ${cores.corPrincipal};
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }

  body.modal-open {
    overflow: hidden;
  }

/*   body.cart-open {
    overflow: hidden;
  } */
`

export const Button = styled.button<Props>`
  display: ${({ tipo }) => (tipo === 'home' ? 'inline-block' : 'block')};
  width: ${({ tipo }) => (tipo === 'home' ? 'auto' : '100%')};
  padding: 6px;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  background-color: ${({ tipo }) =>
    tipo === 'home' ? cores.corPrincipal : cores.corSecundaria};
  color: ${({ tipo }) => (tipo === 'home' ? cores.branco : cores.corPrincipal)};
  border: none;
  outline: none;
  cursor: pointer;
`
