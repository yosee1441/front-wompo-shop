import type { ProductSizes } from '@/models/product.model'
import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'

interface SizeSerlectorProps {
  selectedSize: ProductSizes
  availableSize: ProductSizes[]
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newSize: ProductSizes,
  ) => void
}

function SizeSerlector({
  selectedSize,
  availableSize,
  onChange,
}: SizeSerlectorProps) {
  return (
    <>
      <Typography variant="h4" component={'p'}>
        Tallas disponibles
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={selectedSize}
        exclusive
        onChange={onChange}
        aria-label="Platform"
      >
        {availableSize.map((size) => (
          <ToggleButton key={size} value={size}>
            {size}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  )
}

export default SizeSerlector
