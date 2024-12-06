import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button } from '../../styles'
import { Card, CardButton, Cards, CartContainer, Siderbar } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { formataPreco } from '../../pages/Profile'
import { close, remove } from '../../store/reducers/cart'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state: RootReducer) => state.cart)

  const valorTotal = () => {
    return items.reduce((acumulador, valorAtual) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return (acumulador += valorAtual.preco!)
    }, 0)
  }

  const closeCart = () => {
    dispatch(close())
  }

  const removeItemCart = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(remove(id!))
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Siderbar>
        <Cards>
          {items.map((item) => (
            <Card key={item.id}>
              <img src={item.foto} alt={`${item.nome} image`} />
              <div>
                <h4>{item.nome}</h4>
                <p>{formataPreco(item.preco)}</p>
                <CardButton
                  type="button"
                  onClick={() => removeItemCart(item.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </CardButton>
              </div>
            </Card>
          ))}
        </Cards>
        <p>
          Valor Total <span>{formataPreco(valorTotal())}</span>
        </p>
        <Button tipo="profile">Continuar com a entrega</Button>
      </Siderbar>
      <div className="overlay" onClick={closeCart}></div>
    </CartContainer>
  )
}

export default Cart
