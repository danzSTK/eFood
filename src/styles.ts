import { createGlobalStyle } from 'styled-components'

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
    overflow: hidden
  }
`
