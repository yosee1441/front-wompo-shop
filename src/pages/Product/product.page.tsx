import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/redux/reducers/root.reducer'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { AmountFormat } from '@/components/AmountFormat'
import { SizeSelector } from '@/components/SizeSelector'
import { ProductSlideshow } from '@/components/Slideshow'
import { CreditCardForm } from '@/components/CreditCardForm'
import CreditCardIcon from '@mui/icons-material/CreditCard'

import { findOneProduct } from '@/redux/actions/product.action'
import { Product as IProduct, ProductSizes } from '@/models/product.model'

function Product() {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState<IProduct>()
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedSize, setSelectedSize] = useState<ProductSizes>('XS')

  const { slug } = useParams()
  const dispatch = useDispatch<AppThunkDispatch>()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    slug &&
      dispatch(findOneProduct(slug))
        .unwrap()
        .then((response) => {
          setProduct(response)
          setSelectedSize(response.sizes[0] || '')
        })
        .finally(() => {
          setLoading(false)
        })
  }, [])

  const canPurchase = Boolean(product?.slug)

  return (
    <Container>
      <Grid
        spacing={2}
        container
        justifyContent={'center'}
        alignItems={'flex-start'}
        paddingTop={2}
      >
        <Grid item xs={12} md={6}>
          <ProductSlideshow
            images={product?.images || []}
            title={product?.title || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {loading && (
            <Typography variant="h5" component={'h5'} textAlign="center">
              Loading...
            </Typography>
          )}
          <Stack spacing={2} paddingBottom={2}>
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
            <SizeSelector
              selectedSize={selectedSize}
              availableSize={product?.sizes || []}
              onChange={(_, newSize: ProductSizes) => setSelectedSize(newSize)}
            />
            <Typography variant="h4" component={'p'}>
              Descripción
            </Typography>
            <Typography variant="body2" component={'p'}>
              {product?.description}
            </Typography>
            <Typography variant="h4" component={'p'}>
              Medios de pago
            </Typography>
            <Button
              startIcon={<CreditCardIcon />}
              variant="outlined"
              onClick={handleClickOpen}
              disabled={!canPurchase}
            >
              Pagar con tarjeta de crédito
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <CreditCardForm
        productId={product?.slug || ''}
        open={open}
        onClose={handleClose}
      />
    </Container>
  )
}

export default Product
