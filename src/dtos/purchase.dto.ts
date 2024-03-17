import { Purchase } from '@/models'

export interface CreatePurchaseDto extends Omit<Purchase, 'id'> {}
