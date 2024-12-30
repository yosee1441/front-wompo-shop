import { object, boolean, string } from 'yup'

export const authorizationDialogSchema = () =>
  object({
    acceptancePolicyToken: string(),
    acceptancePolicy: boolean().oneOf(
      [true],
      'Debes aceptar las políticas de privacidad.',
    ),
    personalDataAuthToken: string(),
    personalDataAuth: boolean().oneOf(
      [true],
      'Debes autorizar la administración de tus datos personales.',
    ),
  })
