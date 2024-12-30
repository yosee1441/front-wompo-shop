import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { findAllProducts } from '@/redux/product'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ProductCard } from '@/components/ProductCard'

function Products() {
  const dispatch = useAppDispatch()

  const { loading, results: products } = useAppSelector((state) => state.product)

  useEffect(() => {
    dispatch(findAllProducts())
  }, [])

  return (
    <Grid
      spacing={2}
      container
      justifyContent={'center'}
      alignItems={'center'}
      paddingY={4}
    >
      {loading && (
        <Typography variant="h5" component={'span'}>
          Loading...
        </Typography>
      )}
      {!loading &&
        products &&
        products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.slug}>
            <ProductCard
              slug={product.slug}
              price={product.price}
              image={product.images[0]?.url || ''}
              title={product.title}
              description={product.description}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default Products
