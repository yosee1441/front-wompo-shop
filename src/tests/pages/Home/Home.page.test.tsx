import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'
import { Home } from '@/pages/Home'
import { mocks } from '../../mocks/data.mock'

jest.mock('@/redux/actions/product.action', () => ({
  findAllProducts: () => jest.fn(),
}))

describe('Testing in Home', () => {
  let useDispatchMock: jest.Mock

  beforeEach(() => {
    useDispatchMock = redux.useDispatch as unknown as jest.Mock

    useDispatchMock.mockReturnValue(
      jest.fn().mockReturnValueOnce({
        unwrap: jest.fn().mockResolvedValueOnce(mocks.products),
      }),
    )
  })

  afterEach(() => {
    useDispatchMock.mockClear()
  })

  it('Should render correctly', () => {
    render(<Home />)

    expect(screen)
  })

  test('Should show title', () => {
    render(<Home />)
    const homeText = screen.getByText('Tienda')
    expect(homeText).toBeInTheDocument()
  })

  test('Should show subtitle', () => {
    render(<Home />)
    const homeText = screen.getByText('Todos los productos')
    expect(homeText).toBeInTheDocument()
  })

  it('Should show loading', () => {
    render(<Home />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })
})
