export interface TransactionResponse {
  data: Transaction
  meta: Meta
}

interface Meta {}

export interface Transaction {
  id: string
  createdAt: string
  finalizedAt: null
  amountInCents: number
  reference: string
  customerEmail: string
  currency: string
  paymentMethodType: string
  paymentMethod: Paymentmethod
  status: string
  statusMessage: null
  billingData: null
  shippingAddress: Shippingaddress
  redirectUrl: string
  paymentSourceId: null
  paymentLinkId: null
  customerData: Customerdata
  billId: null
  taxes: Tax[]
  tipInCents: null
}

interface Tax {
  type: string
  amountInCents: number
}

interface Customerdata {
  legalId: string
  fullName: string
  phoneNumber: string
  legalIdType: string
}

interface Shippingaddress {
  addressLine1: string
  country: string
  region: string
  city: string
  phoneNumber: string
}

interface Paymentmethod {
  type: string
  extra: Extra
  installments: number
}

interface Extra {
  bin: string
  name: string
  brand: string
  expYear: string
  cardType: string
  expMonth: string
  lastFour: string
  cardHolder: string
  isThreeDs: boolean
  threeDsAuthType: null
}

export interface TransactionOrderItemResponse {
  orderItemId: number;
  orderId: number;
  paymentId: string;
  order: Order;
  orderItem: OrderItem;
  product: Product;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  iva: string;
  slug: string;
  type: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  quantity: number;
  subtotal: number;
  order: Customer;
  product: Customer;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  deliveryDate: string;
  status: string;
  deliveryAddress: string;
  total: number;
  transaction: OrderItemTransaction;
  customer: Customer;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface Customer {
  id: number;
}

interface OrderItemTransaction {
  id: null;
}
