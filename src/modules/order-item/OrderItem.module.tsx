import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material'

import { findOneById } from '@/redux/order-item'
import { hideCardNumber } from '@/utils/helpers'
import {
  formattedDate,
  formattedPrice,
  parseOrderStatus,
  parseOrderStatusColor,
  OrderStatus,
} from '@/modules/order-item/utils'

const OrderItemModule = () => {
  const { loading, result } = useAppSelector((state) => state.orderItem)

  const { id } = useParams()
  const dispatch = useAppDispatch()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const checkOrderStatus =
    result?.order?.status === OrderStatus.ERROR ||
    result?.order?.status === OrderStatus.DECLINED ||
    result?.order?.status === OrderStatus.VOIDED

  useEffect(() => {
    id && dispatch(findOneById(id))
  }, [id])

  return (
    <Container>
      <Grid
        spacing={2}
        container
        justifyContent={'center'}
        alignItems={'center'}
        paddingTop={2}
      >
        <Grid item xs={12} md={6}>
          {checkOrderStatus && (
            <>
              <Box sx={{ height: 10 }}></Box>
              <Alert severity={'error'}>
                {result?.order.transaction.paymentResponse.data.statusMessage}
              </Alert>
              <Box sx={{ height: 10 }}></Box>
            </>
          )}
          {loading && (
            <Typography variant="h5" component={'span'} textAlign="center">
              Loading...
            </Typography>
          )}
          {!loading && (
            <Card>
              <CardHeader
                title="Detalle de la compra"
                subheader={
                  result?.createdAt ? formattedDate(result?.createdAt) : ''
                }
                action={
                  result?.order?.status && (
                    <Chip
                      label={parseOrderStatus(result.order.status)}
                      color={parseOrderStatusColor(result.order.status)}
                      variant="outlined"
                    />
                  )
                }
              />
              <Divider />
              <CardContent>
                <Stack>
                  <Stack
                    paddingBottom={2}
                    direction={isMobile ? 'column' : 'row'}
                    justifyContent={isMobile ? 'center' : 'space-between'}
                    alignItems={isMobile ? 'start' : 'center'}
                  >
                    <Typography gutterBottom variant="body2" component="p">
                      Producto
                    </Typography>
                    <Typography gutterBottom variant="body1" component="span">
                      {result?.product.title}
                    </Typography>
                  </Stack>
                  <Stack
                    paddingBottom={2}
                    direction={isMobile ? 'column' : 'row'}
                    justifyContent={isMobile ? 'center' : 'space-between'}
                    alignItems={isMobile ? 'start' : 'center'}
                  >
                    <Typography gutterBottom variant="body2" component="p">
                      Dirección de entrega
                    </Typography>
                    <Typography gutterBottom variant="body1" component="span">
                      {result?.order?.deliveryAddress}
                    </Typography>
                  </Stack>
                  <Stack
                    paddingBottom={2}
                    direction={isMobile ? 'column' : 'row'}
                    justifyContent={isMobile ? 'center' : 'space-between'}
                    alignItems={isMobile ? 'start' : 'center'}
                  >
                    <Typography gutterBottom variant="body2" component="p">
                      Fecha de entrega
                    </Typography>
                    <Typography gutterBottom variant="body1" component="span">
                      {result?.order?.deliveryDate
                        ? formattedDate(result?.order?.deliveryDate)
                        : 'N/A'}
                    </Typography>
                  </Stack>
                  <Stack
                    paddingBottom={2}
                    direction={isMobile ? 'column' : 'row'}
                    justifyContent={isMobile ? 'center' : 'space-between'}
                    alignItems={isMobile ? 'start' : 'center'}
                  >
                    <Typography gutterBottom variant="body2" component="p">
                      Pago
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      component="span"
                      textTransform={'capitalize'}
                    >
                      {`${result?.order?.transaction?.paymentResponse?.data?.paymentMethod?.extra?.brand || 'N/A'} ${result?.order?.transaction?.paymentResponse?.data?.paymentMethod?.extra?.bin ? hideCardNumber(result?.order?.transaction?.paymentResponse?.data?.paymentMethod?.extra?.bin) : 'N/A'}`}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    paddingTop={2}
                    direction={isMobile ? 'column' : 'row'}
                    justifyContent={isMobile ? 'center' : 'space-between'}
                    alignItems={isMobile ? 'start' : 'center'}
                  >
                    <Typography gutterBottom variant="body2" component="p">
                      Total
                    </Typography>
                    <Typography gutterBottom variant="body1" component="span">
                      {result?.order?.total
                        ? formattedPrice(result?.order?.total)
                        : '$'}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions>
                <Button component={Link} to="/">
                  Regresar al home
                </Button>
              </CardActions>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default OrderItemModule
