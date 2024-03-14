import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { tesloShopTheme } from '@/styles/theme.style'
import AppRouter from '@/routers/app.router'

function TesloShopApp() {
  return (
    <ThemeProvider theme={tesloShopTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export default TesloShopApp
