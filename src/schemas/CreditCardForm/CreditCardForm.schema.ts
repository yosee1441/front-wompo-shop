import { object, string } from 'yup'
import { isFutureDate, isValidMonth } from './helpers'
import {
  REGEX_VISA_OR_MASTERCARD,
  REGEX_EXPIRATION_DATE,
  REGEX_CVV,
  REGEX_ONLY_NUMBERS,
  REGEX_FORMAT_MM_YY,
} from '@/utils/regex.util'

export const creditCardFormSchema = object({
  cardNumber: string()
    .required('El número de tarjeta es obligatorio')
    .matches(
      REGEX_ONLY_NUMBERS,
      'El número de tarjeta debe contener solo números',
    )
    .test(
      'is-visa-or-mastercard',
      'El número de tarjeta no es válido',
      (value) => REGEX_VISA_OR_MASTERCARD.test(value || ''),
    ),
  name: string().required('El nombre y apellido es obligatorio'),
  expirationDate: string()
    .required('La fecha de expiración es obligatoria')
    .matches(
      REGEX_FORMAT_MM_YY,
      'La fecha de vencimiento debe tener el formato MM/YY',
    )
    .test(
      'is-future-date',
      'La fecha de vencimiento debe ser futura',
      (value) => isFutureDate(value),
    )
    .test(
      'is-valid-month',
      'El mes de la fecha de vencimiento debe estar entre 1 y 12',
      (value) => isValidMonth(value),
    )
    .matches(REGEX_EXPIRATION_DATE, 'La fecha de expiración no es válida'),
  cvv: string()
    .required('El CVV es obligatorio')
    .matches(REGEX_ONLY_NUMBERS, 'El CVV debe contener solo números')
    .matches(REGEX_CVV, 'El CVV no es válido'),
  documentNumber: string()
    .required('El documento es obligatorio')
    .max(10, 'La cédula debe tener como máximo 10 dígitos'),
  typeDocument: string().required('El tipo de documento es obligatorio'),
})
