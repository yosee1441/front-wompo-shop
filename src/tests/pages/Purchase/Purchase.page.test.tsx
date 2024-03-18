import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'
import { Purchase } from '@/pages/Purchase'
import { mocks } from '../../mocks/data.mock'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}))

describe('Testing in Purchase', () => {
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should render correctly', async () => {
    render(<Purchase />)

    expect(screen)
  })
})
