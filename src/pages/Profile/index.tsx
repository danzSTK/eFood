import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../Components/Header'
import ProductList from '../../Components/Product-List'

import { Banner, Content, ProfileTitle, TagTitle } from './styles'
import { Restaurante } from '../Home'
import { ModalContext } from '../../context/ModalContext'

const LojaProfile = () => {
  const { id } = useParams()
  const [restaurante, setResturante] = useState<Restaurante>()

  const context = useContext(ModalContext)

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
      <div>
        <div>
          <img src="" alt="" />
          <div>
            <h4></h4>
            <p></p>
            <p></p>
            <button></button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default LojaProfile
