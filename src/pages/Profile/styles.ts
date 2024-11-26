import styled from 'styled-components'
import { cores } from '../../styles'
import { Button } from '../../Components/Card/styles'

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

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;

  color: ${cores.branco};

  &.open {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
`

export const ModalContainer = styled.div`
  max-width: 1024px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background-color: ${cores.corPrincipal};
  padding: 32px;

  img {
    display: block;
    width: 280px;
    height: 280px;
    object-fit: cover;
    margin-right: 24px;
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  height: 280px;

  h4 {
    font-size: 18px;
    font-weight: 900;
    line-height: 21px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    height: 400;
  }
`

export const ModalButton = styled(Button)`
  display: inline-block;
  max-width: fit-content;
  padding: 4px 8px;
`

export const ButtonCloseModal = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 16px;
  color: ${cores.branco};
  background-color: transparent;
  border: none;
  outline: none;
`
