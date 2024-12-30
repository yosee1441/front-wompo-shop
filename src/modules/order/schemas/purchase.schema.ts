import { object, number, string } from 'yup'

import { Product} from '@/models/product.model'

export const purchaseSchema = (product: Product | null) =>
  object({
    quantity: number()
      .required('La cantidad es obligatoria')
      .test('is-in-stock', 'El producto no está en stock', () => {
        if (!product?.availableStock) return false

        return product.availableStock > 0
      })
      .test(
        'exceeds-stock',
        'La cantidad seleccionada supera el stock disponible',
        (value) => {
          if (!product?.availableStock) return false

          return value <= product.availableStock
        },
      )
      .test(
        'exceeds-size-availability',
        'La cantidad seleccionada supera la cantidad disponible para la talla seleccionada',
        (value, context) => {
          const sizeStock =
            product?.sizes.find(
              (size) => size.id === parseInt(context.parent.sizeId),
            )?.stockQuantity || 0
          return value <= sizeStock
        },
      ),
    sizeId: string().required('Debe seleccionar una talla'),
  })
