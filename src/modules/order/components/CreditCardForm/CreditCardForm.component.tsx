import { useEffect, useState } from 'react'
import { NumberFormatBase, NumericFormat } from 'react-number-format'
import { FormikHelpers, Formik, Form, useFormikContext } from 'formik'
import { lazy } from 'yup'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { CardTypeName, DocumentTypes } from '@/utils/enums.util'
import { TypeWithKey } from '@/models/typeWithKey.model'
import {
  findOneCardType,
  formatCreditCardNumber,
  formatExpirationDate,
} from '@/utils/helpers'
import {
  Button,
  CircularProgress,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Stack,
  DialogActions,
} from '@mui/material'
import { IconMastercard } from '@/modules/order/components/IconMastercard'
import { IconVisa } from '@/modules/order/components/IconVisa'
import { findOneMerchants } from '@/redux/transaction'
import {
  authorizationDialogSchema,
  creditCardFormSchema,
  deliverySchema,
} from '@/modules/order/schemas'
import { steps } from './helpers'
import CloseIcon from '@mui/icons-material/Close'
import { DialogFullScreen } from '@/components/DialogFullScreen'

export interface FormValues {
  cardNumber: string
  region: string
  country: string
  city: string
  name: string
  expirationDate: string
  cvv: string
  legalId: string
  legalIdType: string
  address: string
  installments: number
  acceptancePolicy: boolean
  acceptancePolicyToken: string
  personalDataAuth: boolean
  personalDataAuthToken: string
}

interface CreditCardFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void
}

function CreditCardForm({ open, onClose, onSubmit }: CreditCardFormProps) {
  const [activeStep, setActiveStep] = useState<number>(0)

  const { merchants } = useAppSelector((state) => state.transaction)
  const { result: authUser } = useAppSelector((state) => state.authUser)
  const dispatch = useAppDispatch()

  const iconCardTypeComponents = () => ({
    [CardTypeName.VISA]: <IconVisa />,
    [CardTypeName.MASTERCARD]: <IconMastercard />,
  })

  const validationSchemas = [
    deliverySchema(),
    creditCardFormSchema(),
    authorizationDialogSchema(),
  ]

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  const StepContent = ({ step }: { step: number }) => {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      isSubmitting,
      isValid,
      validateForm,
      setTouched,
    } = useFormikContext<FormValues>()

    const components: TypeWithKey<JSX.Element> = {
      0: (
        <>
          <DialogTitle>Recibir en casa</DialogTitle>
          <DialogContent>
            <DialogContentText paddingBottom={2}>
              Dirección de entrega
            </DialogContentText>
            <TextField
              margin="dense"
              id="region"
              name="region"
              label="Departamento"
              fullWidth
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.region && Boolean(errors.region)}
              helperText={touched.region && errors.region}
              disabled
            />
            <TextField
              margin="dense"
              id="city"
              name="city"
              label="Ciudad"
              fullWidth
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
              disabled
            />
            <TextField
              margin="dense"
              id="address"
              name="address"
              label="Dirección"
              fullWidth
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
              disabled
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                validateForm().then((errors) => {
                  setTouched({
                    region: true,
                    city: true,
                    address: true,
                  })

                  Object.keys(errors).length === 0 && handleNext()
                })
              }}
              variant="contained"
              color="primary"
              disabled={isSubmitting || !isValid}
            >
              Siguiente
            </Button>
          </DialogActions>
        </>
      ),
      1: (
        <>
          <DialogTitle>Tarjetas de crédito</DialogTitle>
          <DialogContent>
            <DialogContentText paddingBottom={2}>
              Acreditación instantánea.
            </DialogContentText>
            <NumberFormatBase
              format={(value: string) => formatCreditCardNumber(value)}
              customInput={TextField}
              margin="dense"
              id="cardNumber"
              name="cardNumber"
              label="Número de Tarjeta"
              fullWidth
              value={values.cardNumber}
              onValueChange={({ value }) => {
                setFieldValue('cardNumber', value)
              }}
              error={touched.cardNumber && Boolean(errors.cardNumber)}
              helperText={touched.cardNumber && errors.cardNumber}
              onBlur={handleBlur}
              InputProps={{
                endAdornment:
                  iconCardTypeComponents()[
                    findOneCardType(
                      values.cardNumber,
                    ) as keyof typeof iconCardTypeComponents
                  ],
              }}
            />
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Nombre y apellido"
              fullWidth
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <Grid spacing={2} container>
              <Grid item xs={12} md={6}>
                <NumberFormatBase
                  format={(value: string) => formatExpirationDate(value)}
                  customInput={TextField}
                  margin="dense"
                  id="expirationDate"
                  name="expirationDate"
                  label="Fecha de Expiración (MM/YY)"
                  fullWidth
                  value={values.expirationDate}
                  onBlur={handleBlur}
                  onValueChange={({ formattedValue }) => {
                    setFieldValue('expirationDate', formattedValue)
                  }}
                  error={
                    touched.expirationDate && Boolean(errors.expirationDate)
                  }
                  helperText={touched.expirationDate && errors.expirationDate}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  margin="dense"
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  fullWidth
                  value={values.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cvv && Boolean(errors.cvv)}
                  helperText={touched.cvv && errors.cvv}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  margin="dense"
                  id="installments"
                  name="installments"
                  select
                  fullWidth
                  label="Cuotas"
                  value={values.installments}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ),
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  id="legalIdType"
                  name="legalIdType"
                  select
                  fullWidth
                  label="Tipo"
                  value={values.legalIdType}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {Object.keys(DocumentTypes).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={9}>
                <NumericFormat
                  customInput={TextField}
                  decimalScale={0}
                  allowNegative={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  id="legalId"
                  name="legalId"
                  label="Cédula"
                  fullWidth
                  value={values.legalId}
                  onBlur={handleBlur}
                  onValueChange={({ value }) => {
                    setFieldValue('legalId', value)
                  }}
                  error={touched.legalId && Boolean(errors.legalId)}
                  helperText={touched.legalId && errors.legalId}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBack}>Atrás</Button>
            <Button
              onClick={() => {
                validateForm().then((errors) => {
                  setTouched({
                    cardNumber: true,
                    name: true,
                    legalIdType: true,
                    legalId: true,
                    installments: true,
                    cvv: true,
                    expirationDate: true,
                  })

                  Object.keys(errors).length === 0 && handleNext()
                })
              }}
              variant="contained"
              color="primary"
              startIcon={isSubmitting ? <CircularProgress size={24} /> : null}
              disabled={isSubmitting || !isValid}
            >
              Siguiente
            </Button>
          </DialogActions>
        </>
      ),
      2: (
        <>
          <DialogTitle>Autorizaciones Requeridas</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Para continuar, debes aceptar las siguientes autorizaciones:
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="acceptancePolicy"
                    name="acceptancePolicy"
                    checked={values.acceptancePolicy}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={
                  <span>
                    Acepto haber leído
                    <Link
                      href={
                        merchants.results?.data?.presignedAcceptance?.permalink
                      }
                      target="_blank"
                      rel="noopener"
                    >
                      {' los reglamientos y politicas de privacidad '}
                    </Link>
                    para hacer este pago.
                  </span>
                }
              />
              {errors.acceptancePolicy && (
                <FormHelperText error>{errors.acceptancePolicy}</FormHelperText>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    id="personalDataAuth"
                    name="personalDataAuth"
                    checked={values.personalDataAuth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color="primary"
                  />
                }
                label={
                  <span>
                    Acepto la
                    <Link
                      href={
                        merchants.results?.data?.presignedPersonalDataAuth
                          ?.permalink
                      }
                      target="_blank"
                      rel="noopener"
                    >
                      {
                        ' autorización para la administración de datos personales'
                      }
                    </Link>
                    .
                  </span>
                }
              />
              {errors.personalDataAuth && (
                <FormHelperText error>{errors.personalDataAuth}</FormHelperText>
              )}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBack}>Atrás</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={isSubmitting ? <CircularProgress size={24} /> : null}
              disabled={isSubmitting || !isValid}
            >
              Completar compra
            </Button>
          </DialogActions>
        </>
      ),
    }

    return components[step] || null
  }

  const handleClose = () => {
    setActiveStep(0)
    onClose()
  }

  useEffect(() => {
    open &&
      dispatch(findOneMerchants()).catch(() => {
        handleClose()
      })
  }, [open])

  return (
    <DialogFullScreen open={open} onClose={handleClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Preparando compra</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Stack
          direction="column"
          paddingTop={(theme) => theme.spacing(2)}
          spacing={1}
        >
          <Formik
            enableReinitialize
            initialValues={{
              region: authUser?.region || '',
              country: authUser?.country || '',
              city: authUser?.city || '',
              cardNumber: '',
              name: '',
              expirationDate: '',
              cvv: '',
              legalId: authUser?.legalId || '',
              legalIdType: authUser?.legalIdType || 'CC',
              address: authUser?.address || 'CC',
              installments: 1,
              acceptancePolicy: false,
              acceptancePolicyToken:
                merchants.results?.data?.presignedPersonalDataAuth
                  ?.acceptanceToken || '',
              personalDataAuth: false,
              personalDataAuthToken:
                merchants.results?.data?.presignedAcceptance?.acceptanceToken ||
                '',
            }}
            validationSchema={lazy(() => validationSchemas[activeStep])}
            onSubmit={(values, helpers) => {
              onSubmit(values, helpers)
              handleClose()
            }}
          >
            {() => (
              <Form>
                <Stepper activeStep={activeStep}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <StepContent step={activeStep} />
              </Form>
            )}
          </Formik>
        </Stack>
      </Container>
    </DialogFullScreen>
  )
}

export default CreditCardForm
