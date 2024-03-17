import { styled } from '@mui/material/styles'
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia'

interface CardMediaCustomProps extends CardMediaProps {
  alt: string
  height: string
  loading: string
}

export const CardMediaCustom = styled(({ ...props }: CardMediaCustomProps) => (
  <CardMedia {...props} />
))(() => ({
  width: '100%',
  maxWidth: '500px',
  aspectRatio: '16/9',
  objectFit: 'cover',
}))
