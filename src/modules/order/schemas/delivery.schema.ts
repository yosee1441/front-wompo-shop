import { object, string } from 'yup'

export const deliverySchema = () =>
  object({
    address: string().required('La dirección es obligatoria'),
    region: string().required('El departamento es obligatorio'),
    city: string().required('La ciudad es obligatoria'),
  })
