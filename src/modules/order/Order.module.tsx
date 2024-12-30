import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormikHelpers, useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import FormHelperText from '@mui/material/FormHelperText'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { AmountFormat } from '@/components/AmountFormat'
import { SizeSelector } from '@/components/SizeSelector'
import { ItemCounter } from '@/components/ItemCounter'
import { ProductSlideshow } from '@/components/Slideshow'
import {
  CreditCardForm,
  FormValuesProps,
} from '@/modules/order/components/CreditCardForm'
import CreditCardIcon from '@mui/icons-material/CreditCard'

import { findOneProductBySlug } from '@/redux/order'
import { createTransaction } from '@/redux/transaction'
import { purchaseSchema } from './schemas'
import { parseExpirationDate } from './utils'
import { VITE_BASE_URL } from '@/env'
import { snackbarUtilities } from '@/utils/snackbarManager'
import { showLoading, hiddenLoading } from '@/redux/order/order.slice'
import { CircularProgress } from '@mui/material'

function OrderModule() {
  const [open, setOpen] = useState(false)
  const { loading, result: product } = useAppSelector((state) => state.order)
  const { result: authUser } = useAppSelector((state) => state.authUser)
  const timeOutRef = useRef<NodeJS.Timeout | null>(null)

  const navigate = useNavigate()
  const { slug } = useParams()
  const dispatch = useAppDispatch()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: 1,
      sizeId: product?.sizes[0]?.id || 0,
    },
    validationSchema: purchaseSchema(product),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {},
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (
    params: FormValuesProps,
    helpers: FormikHelpers<FormValuesProps>,
  ) => {
    const { expMonth, expYear } = parseExpirationDate(params.expirationDate)

    dispatch(showLoading())
    dispatch(
      createTransaction({
        quantity: formik.values.quantity,
        productId: product?.id || 0,
        customerId: authUser?.id || 0,
        sizeId: formik.values.sizeId,
        cardNumber: params.cardNumber,
        redirectUrl: `${VITE_BASE_URL}/orden-item`,
        expMonth,
        expYear,
        cvc: params.cvv,
        cardHolder: params.name,
        acceptanceToken: params.acceptancePolicyToken,
        acceptPersonalAuth: params.personalDataAuthToken,
        currency: authUser?.currency || 'COP',
        customerEmail: authUser?.email || '',
        paymentMethod: {
          type: 'CARD',
          installments: params.installments,
        },
      }),
    )
      .unwrap()
      .then((response) => {
        formik.resetForm()

        snackbarUtilities.success(
          'Transacción realizada y pendiente por aprobación',
        )

        return response
      })
      .then((response) => {
        timeOutRef.current = setTimeout(() => {
          navigate(`/orden-item/${response.data.paymentId}`)
        }, 1000)
      })
      .finally(() => {
        helpers.setSubmitting(false)
        dispatch(hiddenLoading())
      })
  }

  useEffect(() => {
    slug &&
      dispatch(findOneProductBySlug(slug)).then(() => {
        formik.validateOnMount = false
        formik.setTouched({
          quantity: true,
          sizeId: true,
        })
        formik.validateForm()
      })

    return () => {
      timeOutRef.current && clearTimeout(timeOutRef.current)
    }
  }, [slug])

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
            <Typography variant="h4" component={'p'}>
              Cantidad
            </Typography>
            <ItemCounter
              quantity={formik.values.quantity}
              onClickAdd={() =>
                formik.setFieldValue('quantity', formik.values.quantity + 1)
              }
              onClickRemove={() =>
                formik.values.quantity > 1 &&
                formik.setFieldValue('quantity', formik.values.quantity - 1)
              }
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <FormHelperText error>{formik.errors.quantity}</FormHelperText>
            )}
            <SizeSelector
              selectedSize={formik.values.sizeId}
              availableSize={product?.sizes || []}
              onChange={(_, sizeId) => formik.setFieldValue('sizeId', sizeId)}
            />
            {formik.touched.sizeId && formik.errors.sizeId && (
              <FormHelperText error>{formik.errors.sizeId}</FormHelperText>
            )}
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
              startIcon={loading ? <CircularProgress size={24} /> : null}
              disabled={loading || formik.isValidating || !formik.isValid}
            >
              Pagar con tarjeta de crédito
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <CreditCardForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default OrderModule
