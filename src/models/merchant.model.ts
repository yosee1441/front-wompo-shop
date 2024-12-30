export interface MerchantResponse {
  data: Merchant
  meta: Meta
}

interface Meta {}

export interface Merchant {
  id: number
  name: string
  email: string
  contactName: string
  phoneNumber: string
  active: boolean
  logoUrl: null
  legalName: string
  legalIdType: string
  legalId: string
  publicKey: string
  acceptedCurrencies: string[]
  fraudJavascriptKey: string
  fraudGroups: Fraudgroup[]
  acceptedPaymentMethods: string[]
  paymentMethods: Paymentmethod[]
  presignedAcceptance: Presignedacceptance
  presignedPersonalDataAuth: Presignedacceptance
}

interface Presignedacceptance {
  acceptanceToken: string
  permalink: string
  type: string
}

interface Paymentmethod {
  name: string
  paymentProcessors: Paymentprocessor[]
}

interface Paymentprocessor {
  name: string
}

interface Fraudgroup {
  provider: string
  publicData: Publicdata
}

interface Publicdata {
  javascriptKey: string
}
