import styled from 'styled-components'
import { cores } from '../../styles'

export const Banner = styled.div`
  position: relative;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

export const Content = styled.div`
  position: relative;
  height: 280px;
`

export const TagTitle = styled.h2`
  position: absolute;
  top: 25px;
  font-size: 32px;
  line-height: 38px;
  font-weight: lighter;
  color: ${cores.branco};
`

export const ProfileTitle = styled(TagTitle)`
  top: initial;
  bottom: 25px;
  font-weight: 900;
`
