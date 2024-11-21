import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../Components/Header'
import ProductList from '../../Components/Product-List'

import { Banner, Content, ProfileTitle, TagTitle } from './styles'
import { Restaurante } from '../Home'

const LojaProfile = () => {
  const { id } = useParams()
  const [restaurante, setResturante] = useState<Restaurante>()

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
      <ProductList tipo="profile" cardapios={restaurante.cardapio} />
    </>
  )
}

export default LojaProfile
