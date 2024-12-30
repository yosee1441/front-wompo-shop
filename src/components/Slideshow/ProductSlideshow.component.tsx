import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Box } from '@mui/material'

import { Image } from '@/models'

import 'swiper/css'
import 'swiper/css/navigation'
import './productSlideshow.css'

interface ProductSlideShowProps {
  images: Image[]
  title: string
}

function ProductSlideshow({ images, title }: ProductSlideShowProps) {
  return (
    <Box>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={`/products/${image.url}`}
              width={1024}
              height={800}
              alt={title}
              loading="lazy"
              className="product-slideshow__image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default ProductSlideshow
