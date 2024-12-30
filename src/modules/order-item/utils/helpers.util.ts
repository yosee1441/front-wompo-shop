import { ChipOwnProps } from '@mui/material/Chip'

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const formattedPrice = (price: string) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(parseFloat(price))

export const parseOrderStatus = (status: string) => {
  const statusMapping: Record<string, string> = {
    PENDING: 'Pendiente',
    APPROVED: 'Aprobado',
    DECLINED: 'Declinada',
    ERROR: 'Error',
    VOIDED: 'Anulada',
  }
  return statusMapping[status] || null
}

export const parseOrderStatusColor = (status: string) => {
  const colors: Record<string, ChipOwnProps['color']> = {
    PENDING: 'warning',
    APPROVED: 'success',
    DECLINED: 'error',
    ERROR: 'error',
    VOIDED: 'error',
    Default: 'default',
  }
  return colors[status] || colors.Default
}
