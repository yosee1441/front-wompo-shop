import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { tesloShopTheme } from '@/styles/theme.style'
import AppRouter from '@/routers/app.router'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilitiesConfigurator } from '@/utils/snackbarManager'
import store from '@/redux/store'

function TesloShopApp() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={tesloShopTheme}>
        <SnackbarProvider>
          <CssBaseline />
          <AppRouter />
          <SnackbarUtilitiesConfigurator />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default TesloShopApp
