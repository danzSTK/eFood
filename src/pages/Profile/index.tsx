import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// styles
import {
  Banner,
  ButtonCloseModal,
  Content,
  Modal,
  ModalButton,
  ModalContainer,
  ModalContent,
  ProfileTitle,
  TagTitle
} from './styles'
import Header from '../../Components/Header'
import ProductList from '../../Components/Product-List'

//tipos
import { Cardapio, Restaurante } from '../Home'
import { ModalContext } from '../../context/ModalContext'

export const formataPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const LojaProfile = () => {
  const { id } = useParams()
  const [restaurante, setResturante] = useState<Restaurante>()

  const context = useContext(ModalContext)

  const produtoDoCardapio: Cardapio | undefined = restaurante?.cardapio.find(
    (item) => item.id === context?.modalID
  )

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setResturante(res))
  }, [id])

  if (!restaurante) return <h2>Carregando...</h2>

  return (
    <>
      <Header tipo="profile" />
      <Content>
        <Banner style={{ backgroundImage: `url(${restaurante.capa})` }} />
        <div className="container">
          <TagTitle>{restaurante.tipo}</TagTitle>
          <ProfileTitle>{restaurante.titulo}</ProfileTitle>
        </div>
      </Content>
      <div className="container">
        <ProductList tipo="profile" cardapios={restaurante.cardapio} />
      </div>
      <Modal className={context?.openModal ? 'open' : ''}>
        <ModalContainer className="container">
          <ButtonCloseModal onClick={context?.toggleModal}>
            <FontAwesomeIcon icon={faXmark} />
          </ButtonCloseModal>
          <img src={produtoDoCardapio?.foto} alt="Imagem do item" />
          <ModalContent>
            <h4>{produtoDoCardapio?.nome}</h4>
            <p>{produtoDoCardapio?.descricao}</p>
            <p>Serve {produtoDoCardapio?.porcao}</p>
            <ModalButton tipo="profile">
              Adicionar ao carrinho - {formataPreco(produtoDoCardapio?.preco)}{' '}
            </ModalButton>
          </ModalContent>
        </ModalContainer>
        <div className="overlay" onClick={context?.toggleModal}></div>
      </Modal>
    </>
  )
}

export default LojaProfile
