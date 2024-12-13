import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RootReducer } from '../../store'

import { formataPreco } from '../../pages/Profile'
import { close, remove } from '../../store/reducers/cart'

import { Button } from '../../styles'
import {
  ButtonGroup,
  Card,
  CardButton,
  Cards,
  CartContainer,
  InputGruop,
  Row,
  Siderbar
} from './styles'

const Cart = () => {
  const [proceedToDelivery, setProceedToDelivery] = useState(false)
  const [completePayment, setCompletPayment] = useState(false)
  const [isCart, setIsCart] = useState(true)
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state: RootReducer) => state.cart)

  const form = useFormik({
    initialValues: {
      receiver: '',
      address: '',
      city: '',
      cep: '',
      houseNumber: '',
      complement: ''
    },
    validationSchema: Yup.object({
      receiver: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      address: Yup.string().required('O campo é obrigatório'),
      city: Yup.string()
        .min(4, 'O campo precisar ter 4 ou mais caracteres')
        .required('O campo é obrigatório'),
      cep: Yup.string()
        .transform((value) => (value.includes('_') ? '' : value))
        .matches(/^\d{5}-\d{3}$/, 'CEP inválido.')
        .required('O campo é obrigatório'),

      houseNumber: Yup.number().required('O campo é obrigatório')
    }),
    onSubmit: (values) => {
      renderizaCarrinho('pagamento')
    }
  })

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

  const invalidField = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isInvalid && isTouched

    return hasError
  }

  const renderizaCarrinho = (name: 'carrinho' | 'entrega' | 'pagamento') => {
    switch (name) {
      case 'carrinho':
        setIsCart(true)
        setCompletPayment(false)
        setProceedToDelivery(false)
        break
      case 'entrega':
        setIsCart(false)
        setProceedToDelivery(true)
        setCompletPayment(false)
        break
      case 'pagamento':
        setIsCart(false)
        setProceedToDelivery(false)
        setCompletPayment(true)
        break
      default:
        alert('erro no tipo de renderização')
        break
    }
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Siderbar>
        {items.length === 0 ? (
          <p>
            O carrinho está vázio, adicione produtos no carrinho para prosseguir
            com a compra 😉.
          </p>
        ) : (
          <>
            {isCart && (
              <>
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
                <Button
                  tipo="profile"
                  type="button"
                  onClick={() => renderizaCarrinho('entrega')}
                >
                  Continuar com a entrega
                </Button>
              </>
            )}

            {/* condição boolean para prosseguir com a compra */}
            {proceedToDelivery && (
              <div>
                <h2>Entrega</h2>
                <form onSubmit={form.handleSubmit}>
                  <Row>
                    <InputGruop>
                      <label htmlFor="receiver">Quem irá receber</label>
                      <input
                        type="text"
                        id="receiver"
                        name="receiver"
                        value={form.values.receiver}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={invalidField('receiver') ? 'invalid' : ''}
                      />
                      {invalidField('receiver') && (
                        <p>{form.errors.receiver}</p>
                      )}
                    </InputGruop>
                  </Row>
                  <Row>
                    <InputGruop>
                      <label htmlFor="address">Endereço</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={form.values.address}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={invalidField('address') ? 'invalid' : ''}
                      />
                      {invalidField('address') && <p>{form.errors.address}</p>}
                    </InputGruop>
                  </Row>
                  <Row>
                    <InputGruop>
                      <label htmlFor="city">Cidade</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={form.values.city}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={invalidField('city') ? 'invalid' : ''}
                      />
                      {invalidField('city') && <p>{form.errors.city}</p>}
                    </InputGruop>
                  </Row>
                  <Row>
                    <InputGruop maxWidth="156px">
                      <label htmlFor="cep">CEP</label>
                      <InputMask
                        type="text"
                        id="cep"
                        name="cep"
                        value={form.values.cep}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        mask="99999-999"
                        className={invalidField('cep') ? 'invalid' : ''}
                      />
                      {invalidField('cep') && <p>{form.errors.cep}</p>}
                    </InputGruop>
                    <InputGruop maxWidth="156px">
                      <label htmlFor="houseNumber">Número</label>
                      <input
                        type="text"
                        id="houseNumber"
                        name="houseNumber"
                        value={form.values.houseNumber}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        className={invalidField('houseNumber') ? 'invalid' : ''}
                      />
                      {invalidField('houseNumber') && (
                        <p>{form.errors.houseNumber}</p>
                      )}
                    </InputGruop>
                  </Row>
                  <Row>
                    <InputGruop>
                      <label htmlFor="complement">Complemento (opcional)</label>
                      <input
                        type="text"
                        id="complement"
                        name="complement"
                        value={form.values.complement}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                    </InputGruop>
                  </Row>
                  <ButtonGroup>
                    <Button tipo="profile" type="submit">
                      Continuar com o pagamento
                    </Button>
                    <Button
                      type="button"
                      tipo="profile"
                      onClick={() => setProceedToDelivery(false)}
                    >
                      Voltar para o carrinho
                    </Button>
                  </ButtonGroup>
                </form>
              </div>
            )}

            {completePayment && (
              <Button tipo="profile" onClick={() => console.log(form.values)}>
                Teste
              </Button>
            )}
          </>
        )}
      </Siderbar>
      <div className="overlay" onClick={closeCart}></div>
    </CartContainer>
  )
}

export default Cart
