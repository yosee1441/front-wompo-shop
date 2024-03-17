import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/redux/reducers/root.reducer'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { creditCardFormSchema } from '@/schemas'
import { CardTypeName, DocumentTypes } from '@/utils/enums.util'
import {
  findOneCardType,
  formatCreditCardNumber,
  formatExpirationDate,
} from '@/utils/helpers'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import { Mastercard, Visa } from './components'
import { NumberFormatBase, NumericFormat } from 'react-number-format'
import { createPurchase } from '@/redux/actions/purchase.action'
import { CreatePurchaseDto } from '@/dtos'
import { snackbarUtilities } from '@/utils/snackbarManager'

interface CreditCardFormProps {
  productId: string
  open: boolean
  onClose: () => void
}

function CreditCardForm({ productId, open, onClose }: CreditCardFormProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppThunkDispatch>()

  const handleSubmit = async (values: CreatePurchaseDto) =>
    dispatch(createPurchase(values))
      .unwrap()
      .then((response) => {
        navigate('/compra/' + response.id)
        snackbarUtilities.success('Pago exitoso')
      })
      .then(() => {
        onClose()
      })
      .catch(() => {
        snackbarUtilities.error('El pago fallo')
      })

  const formik = useFormik({
    initialValues: {
      productId,
      cardNumber: '',
      name: '',
      expirationDate: '',
      cvv: '',
      documentNumber: '',
      typeDocument: 'CC',
    },
    validationSchema: creditCardFormSchema,
    onSubmit: (values, helpers) => {
      handleSubmit(values).finally(() => {
        helpers.setSubmitting(false)
        helpers.setTouched({})
        helpers.resetForm()
      })
    },
  })

  const components = () => ({
    [CardTypeName.VISA]: <Visa />,
    [CardTypeName.MASTERCARD]: <Mastercard />,
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: formik.handleSubmit,
      }}
    >
      <DialogTitle>Tarjetas de crédito</DialogTitle>
      <DialogContent>
        <DialogContentText paddingBottom={2}>
          Acreditación instantánea.
        </DialogContentText>
        <NumberFormatBase
          format={(value: string) => formatCreditCardNumber(value)}
          customInput={TextField}
          autoFocus
          margin="dense"
          id="cardNumber"
          name="cardNumber"
          label="Número de Tarjeta"
          fullWidth
          value={formik.values.cardNumber}
          onValueChange={({ value }) => {
            formik.setFieldValue('cardNumber', value)
          }}
          error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          onBlur={formik.handleBlur}
          InputProps={{
            endAdornment:
              components()[
                findOneCardType(
                  formik.values.cardNumber,
                ) as keyof typeof components
              ],
          }}
        />
        <TextField
          margin="dense"
          id="name"
          name="name"
          label="Nombre y apellido"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
              value={formik.values.expirationDate}
              onBlur={formik.handleBlur}
              onValueChange={({ formattedValue }) => {
                formik.setFieldValue('expirationDate', formattedValue)
              }}
              error={
                formik.touched.expirationDate &&
                Boolean(formik.errors.expirationDate)
              }
              helperText={
                formik.touched.expirationDate && formik.errors.expirationDate
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="cvv"
              name="cvv"
              label="CVV"
              fullWidth
              value={formik.values.cvv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="typeDocument"
              name="typeDocument"
              select
              fullWidth
              label="Tipo"
              value={formik.values.typeDocument}
              onChange={formik.handleChange}
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
              id="documentNumber"
              name="documentNumber"
              label="Cédula"
              fullWidth
              value={formik.values.documentNumber}
              onBlur={formik.handleBlur}
              onValueChange={({ value }) => {
                formik.setFieldValue('documentNumber', value)
              }}
              error={
                formik.touched.documentNumber &&
                Boolean(formik.errors.documentNumber)
              }
              helperText={
                formik.touched.documentNumber && formik.errors.documentNumber
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button
          type="submit"
          color="primary"
          startIcon={
            formik.isSubmitting ? <CircularProgress size={24} /> : null
          }
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Completar compra
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreditCardForm
