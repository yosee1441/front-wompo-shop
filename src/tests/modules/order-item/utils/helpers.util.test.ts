import {
  formattedDate,
  formattedPrice,
  parseOrderStatus,
  parseOrderStatusColor,
} from '@/modules/order-item/utils/helpers.util'

describe('Utility Functions Tests', () => {
  describe('formattedDate', () => {
    it('should format the date correctly in "es-CO" locale', () => {
      const date = '2024-12-30'
      const result = formattedDate(date)
      expect(result).toBe('30 de diciembre de 2024')
    })

    it('should return a valid date format for a different date', () => {
      const date = '2023-01-01'
      const result = formattedDate(date)
      expect(result).toBe('1 de enero de 2023')
    })

    it('should handle invalid date input gracefully', () => {
      const date = 'invalid-date'
      const result = formattedDate(date)
      expect(result).toBe('Invalid Date')
    })
  })

  describe('formattedPrice', () => {
    it('should format the price correctly as COP currency', () => {
      const price = '1000.5'
      const result = formattedPrice(price)
      expect(result).toBe('$1.000,50')
    })

    it('should handle invalid price input gracefully', () => {
      const price = 'invalid-price'
      const result = formattedPrice(price)
      expect(result).toBe('NaN')
    })

    it('should format a whole number price correctly', () => {
      const price = '500'
      const result = formattedPrice(price)
      expect(result).toBe('$500')
    })
  })

  describe('parseOrderStatus', () => {
    it('should correctly map status "PENDING" to "Pendiente"', () => {
      const status = 'PENDING'
      const result = parseOrderStatus(status)
      expect(result).toBe('Pendiente')
    })

    it('should return null for an unknown status', () => {
      const status = 'UNKNOWN'
      const result = parseOrderStatus(status)
      expect(result).toBeNull()
    })

    it('should correctly map status "APPROVED" to "Aprobado"', () => {
      const status = 'APPROVED'
      const result = parseOrderStatus(status)
      expect(result).toBe('Aprobado')
    })
  })

  describe('parseOrderStatusColor', () => {
    it('should return the correct color for "PENDING"', () => {
      const status = 'PENDING'
      const result = parseOrderStatusColor(status)
      expect(result).toBe('warning')
    })

    it('should return the correct color for "APPROVED"', () => {
      const status = 'APPROVED'
      const result = parseOrderStatusColor(status)
      expect(result).toBe('success')
    })

    it('should return the default color for an unknown status', () => {
      const status = 'UNKNOWN'
      const result = parseOrderStatusColor(status)
      expect(result).toBe('default')
    })

    it('should return the correct color for "DECLINED"', () => {
      const status = 'DECLINED'
      const result = parseOrderStatusColor(status)
      expect(result).toBe('error')
    })
  })
})
