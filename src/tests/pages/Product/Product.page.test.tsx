import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'
import { Product } from '@/pages/Order'
import { mocks } from '../../mocks/data.mock'

jest.mock('@/redux/actions/product.action', () => ({
  findOneProduct: () => jest.fn(),
}))

describe('Testing in Product', () => {
  let useDispatchMock: jest.Mock

  beforeEach(() => {
    useDispatchMock = redux.useDispatch as unknown as jest.Mock

    useDispatchMock.mockReturnValue(
      jest.fn().mockReturnValueOnce({
        unwrap: jest.fn().mockResolvedValueOnce(mocks.products[0]),
      }),
    )
  })

  afterEach(() => {
    useDispatchMock.mockClear()
  })

  it('Should render correctly', () => {
    render(<Product />)

    expect(screen)
  })

  it('Should show loading', () => {
    render(<Product />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })
})
