import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'
import { Navbar } from '@/components/Navbar'

const HomePage = lazy(() => import('@/pages/Home/home.page'))
const ProductPage = lazy(() => import('@/pages/Product/product.page'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/notFound.page'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
