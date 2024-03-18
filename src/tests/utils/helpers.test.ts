import {
  findOneCardType,
  formatCreditCardNumber,
  formatExpirationDate,
  hideCardNumber,
} from '@/utils/helpers'
import { CardTypeName } from '@/utils/enums.util'

describe('Testing in Helpers', () => {
  describe('findOneCardType', () => {
    it('Should return VISA when card number matches VISA regex', () => {
      expect(findOneCardType('4111111111111111')).toBe(CardTypeName.VISA)
    })

    it('Should return MASTERCARD when card number matches VISA or MASTERCARD regex', () => {
      expect(findOneCardType('5411111111111111')).toBe(CardTypeName.MASTERCARD)
    })

    it('Should return empty string when card number does not match any regex', () => {
      expect(findOneCardType('6011111111111111')).toBe('')
    })
  })

  describe('formatCreditCardNumber', () => {
    it('Should format credit card number with spaces every four characters', () => {
      expect(formatCreditCardNumber('4111111111111111')).toBe(
        '4111 1111 1111 1111',
      )
    })

    it('Should remove non-numeric characters', () => {
      expect(formatCreditCardNumber('4111-1111-1111-1111')).toBe(
        '4111 1111 1111 1111',
      )
    })
  })

  describe('formatExpirationDate', () => {
    it('Should format expiration date in MM/YY format', () => {
      expect(formatExpirationDate('0525')).toBe('05/25')
    })

    it('Should handle expiration date with spaces', () => {
      expect(formatExpirationDate('05 25')).toBe('05/25')
    })
  })

  describe('hideCardNumber', () => {
    it('Should hide all but the last four digits of the card number', () => {
      expect(hideCardNumber('4111111111111111')).toBe('**** 1111')
    })

    it('Should handle card number with less than four digits', () => {
      expect(hideCardNumber('123')).toBe('**** 123')
    })
  })
})
