import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

import { open } from '../../store/reducers/modal'

import { Button, Card, Content, Description, Tag, Tags, Title } from './styles'

type Props = {
  tipo: 'home' | 'profile'
  title: string
  description: string
  nota?: number
  infos: string[]
  image: string
  id: number | string
  destacado?: boolean
}

const Product = ({
  description,
  title,
  nota,
  infos,
  image,
  id,
  tipo,
  destacado
}: Props) => {
  function CardType() {
    const dispatch = useDispatch()

    const openModal = (id: number | string) => {
      dispatch(open(id))
    }

    if (tipo === 'home') {
      return (
        <Card tipo={tipo}>
          <img src={image} alt="" />
          <Tags>
            {infos.map((info) => (
              <Tag key={info}>{info}</Tag>
            ))}
            {destacado && <Tag>Destacado</Tag>}
          </Tags>
          <Content tipo={tipo}>
            <Title tipo={tipo}>
              <span>{title}</span>
              <span>
                {nota}
                <FontAwesomeIcon icon={icon.faStar} />
              </span>
            </Title>
            <Description tipo={tipo}>{description}</Description>
            <Link to={`profile/${id}`}>
              <Button tipo={tipo} type="button">
                Saiba mais
              </Button>
            </Link>
          </Content>
        </Card>
      )
    }

    if (tipo === 'profile') {
      return (
        <Card tipo={tipo}>
          <img src={image} alt="" />
          <Content tipo={tipo}>
            <Title tipo={tipo}>
              <span>{title}</span>
            </Title>
            <Description tipo={tipo}>{description}</Description>
            <Button tipo={tipo} type="button" onClick={() => openModal(id)}>
              Adicionar ao carrinho
            </Button>
          </Content>
        </Card>
      )
    }
    return null
  }

  return <CardType />
}

export default Product
