import { TypeWithKey } from '@/models/typeWithKey.model'

const codeMatcher: TypeWithKey<string> = {
  500: 'Oops! Algo salió mal. Estamos trabajando para solucionarlo.',
  401: 'Token de acceso no válido.',
  404: 'Error no encontrado.',
  422: 'Error de validación de entrada',
}

export const getValidationError = (status: number): string | null => {
  return codeMatcher[status] || null
}
