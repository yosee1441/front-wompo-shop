import '@testing-library/jest-dom'

jest.mock('./src/env', () => ({
  VITE_API_URL: 'http://localhost:3000/',
}))

jest.mock('axios', () => {
  return {
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('swiper/react', () => {
  const SwiperMock = () => 'Swiper Mock Component'
  const SwiperSlideMock = () => 'Swiper Slide Mock Component'

  return {
    Swiper: SwiperMock,
    SwiperSlide: SwiperSlideMock,
  }
})

jest.mock('swiper/modules', () => {
  const SwiperModuleMock = () => 'Swiper Module Mock Component'

  return {
    SwiperModule: SwiperModuleMock,
  }
})

jest.mock('swiper/css', () => '')
jest.mock('swiper/css/navigation', () => '')

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}))
