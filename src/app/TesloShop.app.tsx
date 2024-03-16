import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { tesloShopTheme } from '@/styles/theme.style'
import AppRouter from '@/routers/app.router'
import store from '@/redux/store'

function TesloShopApp() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={tesloShopTheme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default TesloShopApp
