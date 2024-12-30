export interface CreateTransactionDto {
  quantity: number
  productId: number
  customerId: number
  sizeId: number
  cardNumber: string
  redirectUrl: string
  expMonth: string
  expYear: string
  cvc: string
  cardHolder: string
  acceptanceToken: string
  acceptPersonalAuth: string
  currency: string
  customerEmail: string
  paymentMethod: PaymentMethodDto
}

export interface PaymentMethodDto {
  type: string
  installments: number
}
