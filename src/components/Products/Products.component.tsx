import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/redux/reducers/root.reducer'

import { Product as IProduct } from '@/models/product.model'
import { findAllProducts } from '@/redux/actions/product.action'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ProductCard } from '@/components/ProductCard'

function Products() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const dispatch = useDispatch<AppThunkDispatch>()

  useEffect(() => {
    dispatch(findAllProducts())
      .unwrap()
      .then((response) => {
        setProducts(response)
      })
      .finally(() => {
        setLoading(false)
      })
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
        products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.slug}>
            <ProductCard
              slug={product.slug}
              price={product.price}
              images={product.images}
              title={product.title}
              description={product.description}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default Products
