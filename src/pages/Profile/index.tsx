import { useParams } from 'react-router-dom'

import Header from '../../Components/Header'

import banner from '../../assets/images/banner.png'
import { Banner, Content, ProfileTitle, TagTitle } from './styles'
import ProductList from '../../Components/Product-List'

type Lojas = {
  title: string
  type: string
  id: number
}

const lojas: Lojas[] = [
  { title: 'Hioki Sushi', type: 'Japonesa', id: 1 },
  { title: 'La Dolce Vita Trattoria', type: 'Italiana', id: 2 }
]

const LojaProfile = () => {
  const { id } = useParams()
  const loja = lojas.find((loja) => loja.id === Number(id))

  console.log(loja)

  return (
    <>
      <Header tipo="profile" />
      <Content>
        <Banner style={{ backgroundImage: `url(${banner})` }} />
        <div className="container">
          <TagTitle>{loja?.type}</TagTitle>
          <ProfileTitle>{loja?.title}</ProfileTitle>
        </div>
      </Content>
      {/* <ProductList tipo="profile" /> */}
    </>
  )
}

export default LojaProfile
