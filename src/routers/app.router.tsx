import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'
import { Navbar } from '@/components/Navbar'

const HomePage = lazy(() => import('@/pages/Home/Home.page'))
const OrderPage = lazy(() => import('@/pages/Order/Order.page'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound.page'))
const OrderItemPage = lazy(() => import('@/pages/OrderItem/OrderItem.page'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orden/:slug" element={<OrderPage />} />
          <Route path="/orden-item/:id" element={<OrderItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
