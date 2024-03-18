import { render, screen } from '@testing-library/react'
import { NotFound } from '@/pages/NotFound'

describe('Testing in NotFound', () => {
  test('Should render correctly', () => {
    render(<NotFound />)
    expect(screen)
  })

  test('Should show not found', () => {
    render(<NotFound />)
    const notFoundText = screen.getByText('Not Found')
    expect(notFoundText).toBeInTheDocument()
  })
})
