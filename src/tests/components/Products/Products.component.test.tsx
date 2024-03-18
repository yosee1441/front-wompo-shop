import { render, waitFor, screen } from '@testing-library/react'
import * as redux from 'react-redux'
import { Products } from '@/components/Products'
import { mocks } from '../../mocks/data.mock'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}))

describe('Testing in Products Component', () => {
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

  it('Should render correctly', async () => {
    render(<Products />)

    expect(screen)
  })

  it('Should show loading', () => {
    const { getByText } = render(<Products />)

    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('Should show products when after loading', async () => {
    const { findByText, queryByText } = render(<Products />)

    await findByText('Loading...')

    await waitFor(() => {
      expect(queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(
      await findByText(
        'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',
      ),
    ).toBeInTheDocument()
  })
})
