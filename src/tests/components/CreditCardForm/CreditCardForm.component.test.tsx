import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import { CreditCardForm } from '@/modules/order/components/CreditCardForm'
import { mocks } from '../../mocks/data.mock'

// Creamos un mock de snackbarUtilities
jest.mock('@/utils/snackbarManager', () => ({
  snackbarUtilities: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('Testing in CreditCardForm Component', () => {
  const onClose = jest.fn()
  let useDispatchMock: jest.Mock

  beforeEach(() => {
    useDispatchMock = redux.useDispatch as unknown as jest.Mock
    useDispatchMock.mockReturnValue(
      jest.fn().mockReturnValueOnce({
        unwrap: jest.fn().mockResolvedValueOnce(mocks.purchases),
      }),
    )
  })

  afterEach(() => {
    useDispatchMock.mockClear()
  })

  it('Should render CreditCardForm correctly', () => {
    render(<CreditCardForm productId="product-id" open onClose={onClose} />)

    expect(screen.getByLabelText('Número de Tarjeta')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre y apellido')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Fecha de Expiración (MM/YY)'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('CVV')).toBeInTheDocument()
    expect(screen.getByLabelText('Cédula')).toBeInTheDocument()
    expect(screen.getByText('Completar compra')).toBeInTheDocument()
  })

  it('Should submit form with valid data', async () => {
    render(<CreditCardForm productId="product-id" open onClose={onClose} />)

    fireEvent.change(screen.getByLabelText('Número de Tarjeta'), {
      target: { value: '4111111111111111' },
    })
    fireEvent.change(screen.getByLabelText('Nombre y apellido'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText('Fecha de Expiración (MM/YY)'), {
      target: { value: '12/25' },
    })
    fireEvent.change(screen.getByLabelText('CVV'), { target: { value: '123' } })
    fireEvent.change(screen.getByLabelText('Cédula'), {
      target: { value: '123456789' },
    })

    fireEvent.click(screen.getByText('Completar compra'))

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('Should show error message invalid card number', async () => {
    render(<CreditCardForm productId="product-id" open onClose={onClose} />)

    fireEvent.change(screen.getByLabelText('Número de Tarjeta'), {
      target: { value: '1234' },
    })

    await fireEvent.change(screen.getByLabelText('Cédula'), {
      target: { value: '123456789' },
    })

    await waitFor(() => {
      expect(
        screen.getByText('El número de tarjeta no es válido'),
      ).toBeInTheDocument()
    })
  })
})
