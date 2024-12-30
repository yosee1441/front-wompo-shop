export interface OrderItem {
  id: number;
  quantity: number;
  subtotal: string;
  createdAt: string;
  updatedAt: string;
  order: Order;
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

interface Order {
  id: number;
  deliveryDate: string;
  status: string;
  deliveryAddress: string;
  total: string;
  createdAt: string;
  updatedAt: string;
  transaction: Transaction;
}

interface Transaction {
  id: number;
  referenceNumber: string;
  date: string;
  paymentResponse: PaymentResponse;
  createdAt: string;
  updatedAt: string;
}

interface PaymentResponse {
  data: Data;
  meta: Meta;
}

interface Meta {
}

interface Data {
  id: string;
  taxes: Tax[];
  billId: null;
  status: string;
  currency: string;
  createdAt: string;
  reference: string;
  tipInCents: null;
  billingData: null;
  finalizedAt: null;
  redirectUrl: string;
  customerData: CustomerData;
  amountInCents: number;
  customerEmail: string;
  paymentLinkId: null;
  paymentMethod: PaymentMethod;
  statusMessage: null;
  paymentSourceId: null;
  shippingAddress: ShippingAddress;
  paymentMethodType: string;
}

interface ShippingAddress {
  city: string;
  region: string;
  country: string;
  phoneNumber: string;
  addressLine1: string;
}

interface PaymentMethod {
  type: string;
  extra: Extra;
  installments: number;
}

interface Extra {
  bin: string;
  name: string;
  brand: string;
  expYear: string;
  cardType: string;
  expMonth: string;
  lastFour: string;
  isThreeDs: boolean;
  cardHolder: string;
  threeDsAuthType: null;
}

interface CustomerData {
  legalId: string;
  fullName: string;
  legalIdType: string;
  phoneNumber: string;
}

interface Tax {
  type: string;
  amountInCents: number;
}

