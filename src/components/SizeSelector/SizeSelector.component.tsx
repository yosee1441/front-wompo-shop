import type { Size } from '@/models/product.model'
import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'

interface SizeSerlectorProps {
  selectedSize: number
  availableSize: Size[]
  onChange: (event: React.MouseEvent<HTMLElement>, newSize: Size) => void
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
          <ToggleButton key={size.id} value={size.id} disabled={size.stockQuantity === 0}>
            {size.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  )
}

export default SizeSerlector
