import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { AmountFormat } from '@/components/AmountFormat'

interface ProductCardProps {
  slug: string
  title: string
  price: number
  images: string[]
  description: string
}

function ProductCard({
  slug,
  title,
  price,
  images,
  description,
}: ProductCardProps) {
  return (
    <Card>
      <Link to={`/product/${slug}`}>
        <CardMedia
          component="img"
          alt={title}
          height="450"
          image={`products/${images[0]}`}
          loading="lazy"
        />
      </Link>
      <CardContent>
        <Link to={`/product/${slug}`}>
          <Typography
            variant="body2"
            component={'p'}
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textDecoration: 'none',
            }}
          >
            {description}
          </Typography>
        </Link>
        <AmountFormat
          value={price}
          decimalScale={2}
          renderText={(value) => (
            <Typography variant={'h5'} component={'span'} paddingTop={2}>
              {'$ '}
              {value}
            </Typography>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default ProductCard
