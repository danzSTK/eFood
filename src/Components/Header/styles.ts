import styled, { css } from 'styled-components'

import { Props } from '.'
import { cores } from '../../styles'

export const Hero = styled.header<Props>`
  display: block;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const Container = styled.div<Props>`
  ${({ tipo }) => {
    switch (tipo) {
      case 'home':
        return css`
          height: 364px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 64px;

          img {
            display: block;
            margin: 0 auto;
            width: 125px;
          }

          h1 {
            padding-bottom: 40px;
            margin: 0 auto;
            max-width: 540px;
            font-weight: 900;
            font-size: 36px;
            line-height: 43px;
            text-align: center;
          }
        `
      case 'profile':
        return css`
          display: flex;
          align-items: center;
          height: 180px;

          button {
            flex: 1;
            background-color: transparent;
            border: none;
            outline: none;
            color: ${cores.corPrincipal};
            cursor: pointer;
          }

          h2 {
            flex: 1;
            font-size: 18px;
            font-weight: 900;
            line-height: 21px;

            &:last-child {
              display: flex;
              justify-content: flex-end;
            }

            span {
              margin-right: 4px;
            }
          }

          img {
            width: 125px;
          }
        `
      default:
        return css`
          background-color: red;
        `
    }
  }}/*  height: 364px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 64px;

  img {
    display: block;
    margin: 0 auto;
    width: 125px;
  }

  h1 {
    padding-bottom: 40px;
    margin: 0 auto;
    max-width: 540px;
    font-weight: 900;
    font-size: 36px;
    line-height: 43px;
    text-align: center;
  } */
`
