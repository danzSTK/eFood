import styled from 'styled-components'

import { cores } from '../../styles'

export interface Props {
  tipo: 'profile' | 'home'
}

export const Card = styled.div<Props>`
  position: relative;
  display: block;
  max-width: ${({ tipo }) => (tipo === 'home' ? '472px' : '320px')};
  width: 100%;
  max-height: ${({ tipo }) => (tipo === 'home' ? '400px' : '350px')};
  height: 100%;
  background-color: ${({ tipo }) =>
    tipo === 'home' ? 'tranparent' : cores.corPrincipal};
  padding: ${({ tipo }) => (tipo === 'home' ? '0' : '8px')};

  img {
    display: block;
    width: 100%;
    height: ${({ tipo }) => (tipo === 'home' ? '220px' : '170px')};
    object-fit: cover;
    object-position: center;
  }
`

export const Content = styled.div<Props>`
  display: block;
  border: ${({ tipo }) =>
    tipo === 'home' ? `1px solid ${cores.corPrincipal}` : 'none'};
  border-top: transparent;
  background-color: ${({ tipo }) => (tipo === 'home' ? '#fff' : 'transparent')};
  padding: ${({ tipo }) => (tipo === 'home' ? '0 8px 8px 8px' : '0')};
`

export const Title = styled.h3<Props>`
  padding-top: 8px;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  color: ${({ tipo }) => (tipo === 'home' ? cores.corPrincipal : cores.branco)};

  display: flex;
  justify-content: space-between;

  svg {
    margin-left: 8px;
    color: ${cores.amarelo};
  }
`
export const Description = styled.p<Props>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 22px;
  -webkit-line-clamp: 4;
  max-height: ${({ tipo }) => (tipo === 'home' ? '88px' : '110px')};
  margin: 8px 0;

  color: ${({ tipo }) => (tipo === 'home' ? cores.corPrincipal : cores.branco)};
`

export const Tag = styled.div`
  display: inline-block;
  background-color: ${cores.corPrincipal};
  color: ${cores.branco};
  border: none;
  outline: none;
  padding: 8px;
  margin-right: 8px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 700;

  &:last-child {
    margin-right: 0;
  }
`

export const Tags = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;
`
