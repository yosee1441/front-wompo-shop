import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'

const ShopPage = lazy(() => import('@/pages/shop/shop.page'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
