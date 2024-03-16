import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/redux/reducers/root.reducer'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { AmountFormat } from '@/components/AmountFormat'
import { Button } from '@mui/material'

import { findOneProduct } from '@/redux/actions/product.action'
import { Product as IProduct } from '@/models/product.model'

function Product() {
  const [product, setProduct] = useState<IProduct>()
  const [loading, setLoading] = useState<boolean>(true)

  const { slug } = useParams()
  const dispatch = useDispatch<AppThunkDispatch>()

  useEffect(() => {
    slug &&
      dispatch(findOneProduct(slug))
        .unwrap()
        .then((response) => {
          setProduct(response)
        })
        .finally(() => {
          setLoading(false)
        })
  }, [])

  return (
    <Container>
      {loading && (
        <Typography variant="h5" component={'span'} textAlign="center">
          Loading...
        </Typography>
      )}
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        paddingTop={2}
      >
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component={'h1'}>
            {product?.title}
          </Typography>
          <AmountFormat
            value={product?.price || 0}
            decimalScale={2}
            renderText={(value) => (
              <Typography variant={'h5'} component={'p'}>
                {'$ '}
                {value}
              </Typography>
            )}
          />
          <Button variant="contained">Agregar al carrito</Button>
          <Typography variant="h5" component={'p'}>
            Descripción
          </Typography>
          <Typography variant="body2" component={'p'}>
            {product?.description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Product
