import {
  isValidMonth,
  isFutureDate,
  parseExpirationDate,
} from '@/modules/order/utils/helpers.util'

describe('Utility Functions Tests', () => {
  describe('isValidMonth', () => {
    it('should return true for valid months (1-12)', () => {
      expect(isValidMonth('01/23')).toBe(true)
      expect(isValidMonth('12/23')).toBe(true)
    })

    it('should return false for invalid months (greater than 12 or less than 1)', () => {
      expect(isValidMonth('13/23')).toBe(false)
      expect(isValidMonth('00/23')).toBe(false)
      expect(isValidMonth('25/23')).toBe(false)
    })

    it('should return false for non-numeric month values', () => {
      expect(isValidMonth('abc/23')).toBe(false)
      expect(isValidMonth('XX/23')).toBe(false)
    })
  })

  describe('isFutureDate', () => {
    it('should return true for dates in the future', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const futureDateString = `${futureDate.getMonth() + 1}/${futureDate
        .getFullYear()
        .toString()
        .slice(2)}`
      expect(isFutureDate(futureDateString)).toBe(true)
    })

    it('should return false for dates in the past', () => {
      const pastDate = new Date()
      pastDate.setFullYear(pastDate.getFullYear() - 1)
      const pastDateString = `${pastDate.getMonth() + 1}/${pastDate
        .getFullYear()
        .toString()
        .slice(2)}`
      expect(isFutureDate(pastDateString)).toBe(false)
    })

    it('should return false for the current date', () => {
      const today = new Date()
      const todayString = `${today.getMonth() + 1}/${today
        .getFullYear()
        .toString()
        .slice(2)}`
      expect(isFutureDate(todayString)).toBe(false)
    })
  })

  describe('parseExpirationDate', () => {
    it('should correctly parse the expiration date into month and year', () => {
      const result = parseExpirationDate('11/25')
      expect(result).toEqual({ expMonth: '11', expYear: '25' })
    })

    it('should return empty strings if the input format is incorrect', () => {
      const result = parseExpirationDate('invalid')
      expect(result).toEqual({ expMonth: '', expYear: '' })
    })

    it('should return empty strings for empty input', () => {
      const result = parseExpirationDate('')
      expect(result).toEqual({ expMonth: '', expYear: '' })
    })
  })
})
