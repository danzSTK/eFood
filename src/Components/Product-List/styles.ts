import styled from 'styled-components'

import { Props } from '../Card/styles'

export const Products = styled.div<Props>`
  display: grid;
  grid-template-columns: ${({ tipo }) =>
    tipo === 'home' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  gap: 50px;
  margin-top: 80px;
  margin-bottom: 120px;
`
