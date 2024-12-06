import styled from 'styled-components'
import { cores } from '../../styles'

export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;

  z-index: 1;

  &.is-open {
    display: flex;
  }

  .overlay {
    position: absolute;
    background-color: #000;
    opacity: 0.8;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
`

export const Siderbar = styled.aside`
  max-width: 360px;
  width: 100%;
  height: 100vh;
  z-index: 3;

  color: ${cores.corPrincipal};
  background-color: ${cores.corPrincipal};
  padding: 32px 8px 0 8px;

  & > p {
    color: ${cores.branco};
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0 16px 0;
  }
`

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  img {
    width: 100%;
  }
`

export const Card = styled.li`
  position: relative;
  display: flex;
  gap: 8px;
  padding: 8px;

  background-color: ${cores.corSecundaria};

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  div {
    h4 {
      font-weight: 900;
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 16px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
    }
  }
`

export const CardButton = styled.button`
  position: absolute;
  background-color: transparent;
  font-weight: bold;
  font-size: 16px;
  border: none;
  outline: none;
  color: ${cores.corPrincipal};
  right: 8px;
  bottom: 8px;
`
