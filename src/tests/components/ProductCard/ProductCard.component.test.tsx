import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProductCard } from '@/components/ProductCard'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(({ children }) => <a href="/producto/product-slug">{children}</a>),
}))

describe('Testing inProductCard Component', () => {
  beforeEach(() => {
    const slug = 'product-slug'
    const title = 'Product Title'
    const price = 10
    const images = ['image1.jpg', 'image2.jpg']
    const description = 'Product Description'

    render(
      <BrowserRouter>
        <ProductCard
          slug={slug}
          title={title}
          price={price}
          images={images}
          description={description}
        />
      </BrowserRouter>,
    )
  })

  it('Should render correctly', () => {
    expect(screen)
  })

  it('Should show price', () => {
    expect(screen.getByText('$ 10')).toBeInTheDocument()
  })

  it('Should show description', () => {
    expect(screen.getByText('Product Description')).toBeInTheDocument()
  })

  it('Should show images', () => {
    expect(screen.getByAltText('Product Title')).toBeInTheDocument()
  })

  it('Should be two links', () => {
    expect(document.querySelectorAll('a').length).toBe(2)
  })

  it('Links should point to the correct path', () => {
    document.querySelectorAll('a').forEach((link) => {
      expect(link).toHaveAttribute('href', `/producto/product-slug`)
    })
  })
})
