import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/redux/reducers/root.reducer'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import { Purchase as IPurchase } from '@/models/purchase.model'
import { findOnePurchase } from '@/redux/actions/purchase.action'

import { findOneCardType, hideCardNumber } from '@/utils/helpers'

function Purchase() {
  const [purchase, setPurchase] = useState<IPurchase>()
  const [loading, setLoading] = useState<boolean>(true)

  const { id } = useParams()
  const dispatch = useDispatch<AppThunkDispatch>()

  useEffect(() => {
    id &&
      dispatch(findOnePurchase(+id))
        .unwrap()
        .then((response) => {
          setPurchase(response)
        })
        .finally(() => {
          setLoading(false)
        })
  }, [])

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
          {loading && (
            <Typography variant="h5" component={'span'} textAlign="center">
              Loading...
            </Typography>
          )}
          {!loading && (
            <Card>
              <CardHeader
                title="Detalle de la compra"
                subheader="September 14, 2016"
              />
              <Divider />
              <CardContent>
                <Stack>
                  <Stack
                    paddingBottom={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="body2" component="p">
                      Producto
                    </Typography>
                    <Typography gutterBottom variant="body1" component="span">
                      {purchase?.product?.title}
                    </Typography>
                  </Stack>
                  <Stack
                    paddingBottom={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
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
                      {`${findOneCardType(purchase?.cardNumber || '')} ${hideCardNumber(purchase?.cardNumber || '')}`}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    paddingTop={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="body2" component="p">
                      Total
                    </Typography>
                    <Typography gutterBottom variant="body1" component="span">
                      $ {purchase?.product?.price}
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

export default Purchase
