import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

//redux/ functions redux
import { close } from '../../store/reducers/modal'
import { useGetRestauranteQuery } from '../../store/reducers/api'

// styles
import * as S from './styles'
import Header from '../../Components/Header'
import ProductList from '../../Components/Product-List'

//tipos
import { RootReducer } from '../../store'

export const formataPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const LojaProfile = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { id: ModalID, isOpen } = useSelector(
    (state: RootReducer) => state.modal
  )

  const {
    data: restaurante,
    error: restauranteErro,
    isLoading: carregandoRestaurante
  } = useGetRestauranteQuery(String(id))

  const produtoDoCardapio = restaurante?.cardapio.find(
    (item) => item.id === ModalID
  )

  const closeModal = () => {
    dispatch(close())
  }

  if (!restaurante) {
    return (
      <>
        <Header tipo="profile" />
        <h2>Carregando...</h2>
      </>
    )
  }
  if (restauranteErro) {
    return (
      <>
        <Header tipo="profile" />
        <h2>Opps! Não conseguimos informações sobre esse restaurante</h2>
      </>
    )
  }
  if (carregandoRestaurante) {
    return (
      <>
        <Header tipo="profile" />
        <h2>Carregando...</h2>
      </>
    )
  }

  return (
    <>
      <Header tipo="profile" />
      <S.Content>
        <S.Banner style={{ backgroundImage: `url(${restaurante.capa})` }} />
        <div className="container">
          <S.TagTitle>{restaurante.tipo}</S.TagTitle>
          <S.ProfileTitle>{restaurante.titulo}</S.ProfileTitle>
        </div>
      </S.Content>
      <div className="container">
        <ProductList tipo="profile" cardapios={restaurante.cardapio} />
      </div>
      <S.Modal className={isOpen ? 'open' : ''}>
        <S.ModalContainer className="container">
          <S.ButtonCloseModal onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </S.ButtonCloseModal>
          <img src={produtoDoCardapio?.foto} alt="Imagem do item" />
          <S.ModalContent>
            <h4>{produtoDoCardapio?.nome}</h4>
            <p>{produtoDoCardapio?.descricao}</p>
            <p>Serve {produtoDoCardapio?.porcao}</p>
            <S.ModalButton tipo="profile">
              Adicionar ao carrinho - {formataPreco(produtoDoCardapio?.preco)}{' '}
            </S.ModalButton>
          </S.ModalContent>
        </S.ModalContainer>
        <div className="overlay" onClick={closeModal}></div>
      </S.Modal>
    </>
  )
}

export default LojaProfile
