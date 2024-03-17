import { CardTypeName } from '@/utils/enums.util'
import {
  REGEX_IS_VISA,
  REGEX_VISA_OR_MASTERCARD,
  REGEX_NOT_NUMBERS,
  REGEX_SPACE_EVERY_FOUR_CHAR,
  REGEX_REMOVE_SPACES,
  REGEX_DIVIDE_BY_TWO,
} from '@/utils/regex.util'

export const findOneCardType = (cardNumber: string): string => {
  if (REGEX_IS_VISA.test(cardNumber)) {
    return CardTypeName.VISA
  }
  if (REGEX_VISA_OR_MASTERCARD.test(cardNumber)) {
    return CardTypeName.MASTERCARD
  }
  return ''
}

export const formatCreditCardNumber = (value: string): string =>
  value
    .replace(REGEX_NOT_NUMBERS, '')
    .replace(REGEX_SPACE_EVERY_FOUR_CHAR, '$1 ')
    .trim()

export const formatExpirationDate = (value: string): string =>
  value
    .replace(REGEX_REMOVE_SPACES, '')
    .match(REGEX_DIVIDE_BY_TWO)
    ?.join('/') || ''

export const hideCardNumber = (cardNumber: string): string => {
  const lastFourDigits = cardNumber.slice(-4)
  return '**** ' + lastFourDigits
}
