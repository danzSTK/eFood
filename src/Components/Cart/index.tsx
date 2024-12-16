import InputMask from 'react-input-mask'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RootReducer } from '../../store'

import { formataPreco } from '../../pages/Profile'
import { clear, close, remove } from '../../store/reducers/cart'
import { useCheckoutMutation } from '../../store/reducers/api'

import { Button } from '../../styles'

import * as S from './styles'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [finalizarCompra, { data, isError, isLoading, isSuccess }] =
    useCheckoutMutation()

  const { items, isOpen } = useSelector((state: RootReducer) => state.cart)
  const [proceedToDelivery, setProceedToDelivery] = useState(false)
  const [completePayment, setCompletPayment] = useState(false)
  const [paymentConfirmation, setPaymentConfirmation] = useState(false)
  const [isCart, setIsCart] = useState(true)

  // Gerenciamento dos formularios/validações
  const form = useFormik({
    initialValues: {
      receiver: '',
      address: '',
      city: '',
      cep: '',
      houseNumber: '',
      complement: '',
      ownerCard: '',
      cardNumber: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: ''
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
      houseNumber: Yup.number().required('O campo é obrigatório'),
      ownerCard: Yup.string().when((values, schema) =>
        completePayment
          ? schema
              .min(5, 'O nome precisa ter pelo menos 5 caracteres')
              .required('O campo é obrigatório')
          : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        completePayment
          ? schema
              .transform((value) => value.replace(/\D/g, ''))
              .min(16, 'O número do cartão está incorreto')
              .max(16, 'Número do cartão invalido')
              .required('O campo é obrigatório')
          : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        completePayment
          ? schema
              .required('O campo é obrigatório')
              .transform((value: string) => value.replace(/\D/g, ''))
              .min(3, 'O CVV está inválido')
              .max(3, 'O CVV está inválido')
          : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        completePayment
          ? schema
              .required('O campo é obrigatório')
              .transform((value: string) => value.replace(/\D/g, ''))
              .min(2, 'Essa data é invalida')
              .max(2, 'Essa data é invalida')
          : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        completePayment
          ? schema
              .required('O campo é obrigatório')
              .transform((value: string) => value.replace(/\D/g, ''))
              .min(4, 'Essa data é invalida')
              .max(4, 'Essa data é invalida')
          : schema
      )
    }),
    onSubmit: (values) => {
      if (proceedToDelivery) {
        renderizaCarrinho('pagamento')
      } else if (completePayment) {
        finalizarCompra({
          products: items.map((item) => ({ id: item.id, price: item.preco })),
          delivery: {
            receiver: values.receiver,
            address: {
              description: values.address,
              city: values.city,
              zipCode: values.cep,
              number: Number(values.houseNumber),
              complement: values.complement
            }
          },
          payment: {
            card: {
              name: values.ownerCard,
              number: values.cardNumber,
              code: Number(values.cardCode),
              expires: {
                month: Number(values.expiresMonth),
                year: Number(values.expiresYear)
              }
            }
          }
        })
        renderizaCarrinho('confirmacaoPagamento')
      }
    }
  })

  // Validar mensagem de campo invalido
  const invalidField = (fieldName: string): boolean => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isInvalid && isTouched

    return hasError
  }

  // soma dos valores dentro do carrinho
  const valorTotal = () => {
    return items.reduce((acumulador, valorAtual) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return (acumulador += valorAtual.preco!)
    }, 0)
  }

  // function criada em um slice redux do cart para fechar o carrinho
  const closeCart = () => {
    dispatch(close())
  }

  // function criada em um slice redux do cart para remover itens do carrinho
  const removeItemCart = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(remove(id!))
  }

  // function de renderização condicional do carrinho... função importante para o funcionamento do código
  const renderizaCarrinho = (
    name: 'carrinho' | 'entrega' | 'pagamento' | 'confirmacaoPagamento'
  ) => {
    switch (name) {
      case 'carrinho':
        setIsCart(true)
        setCompletPayment(false)
        setProceedToDelivery(false)
        setPaymentConfirmation(false)
        break
      case 'entrega':
        setIsCart(false)
        setProceedToDelivery(true)
        setCompletPayment(false)
        setPaymentConfirmation(false)
        break
      case 'pagamento':
        setIsCart(false)
        setProceedToDelivery(false)
        setCompletPayment(true)
        setPaymentConfirmation(false)
        break
      case 'confirmacaoPagamento':
        setIsCart(false)
        setProceedToDelivery(false)
        setCompletPayment(false)
        setPaymentConfirmation(true)
        break
      default:
        alert('erro no tipo de renderização')
        break
    }
  }

  // function pós venda, levar cliente de volta a home para comprar novamente
  const finalizePurchaseProcess = () => {
    dispatch(clear())
    dispatch(close())
    renderizaCarrinho('carrinho')
    form.resetForm()
    navigate('/')
  }

  return (
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Siderbar>
        {items.length === 0 ? (
          <p>
            O carrinho está vázio, adicione produtos no carrinho para prosseguir
            com a compra 😉.
          </p>
        ) : (
          <>
            {isCart && (
              <>
                <S.Cards>
                  {items.map((item) => (
                    <S.Card key={item.id}>
                      <img src={item.foto} alt={`${item.nome} image`} />
                      <div>
                        <h4>{item.nome}</h4>
                        <p>{formataPreco(item.preco)}</p>
                        <S.CardButton
                          type="button"
                          onClick={() => removeItemCart(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </S.CardButton>
                      </div>
                    </S.Card>
                  ))}
                </S.Cards>
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
                  <S.Row>
                    <S.InputGruop>
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
                    </S.InputGruop>
                  </S.Row>
                  <S.Row>
                    <S.InputGruop>
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
                    </S.InputGruop>
                  </S.Row>
                  <S.Row>
                    <S.InputGruop>
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
                    </S.InputGruop>
                  </S.Row>
                  <S.Row>
                    <S.InputGruop maxWidth="156px">
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
                    </S.InputGruop>
                    <S.InputGruop maxWidth="156px">
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
                    </S.InputGruop>
                  </S.Row>
                  <S.Row>
                    <S.InputGruop>
                      <label htmlFor="complement">Complemento (opcional)</label>
                      <input
                        type="text"
                        id="complement"
                        name="complement"
                        value={form.values.complement}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                    </S.InputGruop>
                  </S.Row>
                  <S.ButtonGroup>
                    <Button
                      tipo="profile"
                      type="submit"
                      /*  onClick={() => renderizaCarrinho('pagamento')} */
                    >
                      Continuar com o pagamento
                    </Button>
                    <Button
                      type="button"
                      tipo="profile"
                      onClick={() => renderizaCarrinho('carrinho')}
                    >
                      Voltar para o carrinho
                    </Button>
                  </S.ButtonGroup>
                </form>
              </div>
            )}

            {/* condição boolean para renderizar formulario de pagamento */}
            {completePayment && (
              <>
                <h2>Pagamento - valor a pagar {formataPreco(valorTotal())}</h2>
                <form onSubmit={form.handleSubmit}>
                  <S.Row>
                    <S.InputGruop>
                      <label htmlFor="ownerCard">Nome no cartão</label>
                      <input
                        type="text"
                        id="ownerCard"
                        name="ownerCard"
                        value={form.values.ownerCard}
                        onChange={form.handleChange}
                        onBlur={(e) => form.handleBlur(e)}
                        key="ownerCard"
                      />
                      {invalidField('ownerCard') && (
                        <p>{form.errors.ownerCard}</p>
                      )}
                    </S.InputGruop>
                  </S.Row>
                  <S.Row>
                    <S.InputGruop maxWidth="228px">
                      <label htmlFor="cardNumber">Número no cartão</label>
                      <InputMask
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={form.values.cardNumber}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        mask="9999 9999 9999 9999"
                      />
                      {invalidField('cardNumber') && (
                        <p>{form.errors.cardNumber}</p>
                      )}
                    </S.InputGruop>
                    <S.InputGruop maxWidth="90px">
                      <label htmlFor="cardCode">CVV</label>
                      <input
                        type="number"
                        id="cardCode"
                        name="cardCode"
                        value={form.values.cardCode}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {invalidField('cardCode') && (
                        <p>{form.errors.cardCode}</p>
                      )}
                    </S.InputGruop>
                  </S.Row>
                  <S.Row>
                    <S.InputGruop>
                      <label htmlFor="expiresMonth">Mês de vencimento</label>
                      <InputMask
                        type="text"
                        id="expiresMonth"
                        name="expiresMonth"
                        value={form.values.expiresMonth}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        mask="99"
                      />
                      {invalidField('expiresMonth') && (
                        <p>{form.errors.expiresMonth}</p>
                      )}
                    </S.InputGruop>
                    <S.InputGruop>
                      <label htmlFor="expiresYear">Ano de vencimento</label>
                      <InputMask
                        type="text"
                        id="expiresYear"
                        name="expiresYear"
                        value={form.values.expiresYear}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        mask="9999"
                      />
                      {invalidField('expiresYear') && (
                        <p>{form.errors.expiresYear}</p>
                      )}
                    </S.InputGruop>
                  </S.Row>
                  <S.ButtonGroup>
                    <Button tipo="profile" type="submit">
                      Finalizar pagamento
                    </Button>
                    <Button
                      tipo="profile"
                      type="button"
                      onClick={() => renderizaCarrinho('entrega')}
                    >
                      Voltar para a edição de endereço
                    </Button>
                  </S.ButtonGroup>
                </form>
              </>
            )}

            {/* condição boolean para renderizar mensagem de confirmação do pedido */}
            {paymentConfirmation && (
              <>
                {isLoading && <h2>Carregando....</h2>}

                {isSuccess && (
                  <div>
                    <h2>
                      Pedido realizado - <span>{data.orderId}</span>
                    </h2>
                    <p className="text">
                      Estamos felizes em informar que seu pedido já está em
                      processo de preparação e, em breve, será entregue no
                      endereço fornecido.
                    </p>
                    <br />

                    <p className="text">
                      Gostaríamos de ressaltar que nossos entregadores não estão
                      autorizados a realizar cobranças extras.
                    </p>
                    <br />
                    <p className="text">
                      Lembre-se da importância de higienizar as mãos após o
                      recebimento do pedido, garantindo assim sua segurança e
                      bem-estar durante a refeição.
                    </p>
                    <br />
                    <p className="text">
                      Esperamos que desfrute de uma deliciosa e agradável
                      experiência gastronômica. Bom apetite!
                    </p>

                    <S.ButtonGroup>
                      <Button
                        type="button"
                        tipo="profile"
                        onClick={finalizePurchaseProcess}
                      >
                        Concluir
                      </Button>
                    </S.ButtonGroup>
                  </div>
                )}
                {isError && <h2>Opps! Não foi possível realizar seu pedido</h2>}
              </>
            )}
          </>
        )}
      </S.Siderbar>
      <div
        className="overlay"
        onClick={() => (paymentConfirmation ? '' : closeCart())}
      ></div>
    </S.CartContainer>
  )
}

export default Cart
