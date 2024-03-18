import { renderHook } from '@testing-library/react'
import { useSnackbar, ProviderContext } from 'notistack'
import {
  SnackbarUtilitiesConfigurator,
  snackbarUtilities,
} from '@/utils/snackbarManager'

describe('Testing in snackbarManager', () => {
  let useSnackbarRef: ProviderContext

  beforeEach(() => {
    useSnackbarRef = {
      enqueueSnackbar: jest.fn(),
      closeSnackbar: jest.fn(),
    } as ProviderContext

    (useSnackbar as jest.Mock).mockReturnValue(useSnackbarRef)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should call enqueueSnackbar with success variant', () => {
    renderHook(() => SnackbarUtilitiesConfigurator())

    snackbarUtilities.success('Success Message')

    expect(useSnackbarRef.enqueueSnackbar).toHaveBeenCalledWith(
      'Success Message',
      { variant: 'success' },
    )
  })

  it('Should call enqueueSnackbar with error variant', () => {
    renderHook(() => SnackbarUtilitiesConfigurator())

    snackbarUtilities.error('Error Message')

    expect(useSnackbarRef.enqueueSnackbar).toHaveBeenCalledWith(
      'Error Message',
      { variant: 'error' },
    )
  })

  it('Should call enqueueSnackbar with info variant', () => {
    renderHook(() => SnackbarUtilitiesConfigurator())

    snackbarUtilities.info('Info Message')

    expect(useSnackbarRef.enqueueSnackbar).toHaveBeenCalledWith(
      'Info Message',
      { variant: 'info' },
    )
  })

  it('Should call enqueueSnackbar with warning variant', () => {
    renderHook(() => SnackbarUtilitiesConfigurator())

    snackbarUtilities.warning('Warning Message')

    expect(useSnackbarRef.enqueueSnackbar).toHaveBeenCalledWith(
      'Warning Message',
      { variant: 'warning' },
    )
  })
})
