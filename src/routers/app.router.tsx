import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'
import { Navbar } from '@/components/Navbar'

const HomePage = lazy(() => import('@/pages/Home/Home.page'))
const ProductPage = lazy(() => import('@/pages/Product/Product.page'))
const PurchasePage = lazy(() => import('@/pages/Purchase/Purchase.page'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound.page'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producto/:slug" element={<ProductPage />} />
          <Route path="/compra/:id" element={<PurchasePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
