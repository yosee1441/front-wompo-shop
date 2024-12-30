import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

interface ItemCounterProps {
  quantity: number
  onClickRemove: () => void
  onClickAdd: () => void
}

const ItemCounter: FC<ItemCounterProps> = ({
  quantity,
  onClickRemove,
  onClickAdd,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={onClickRemove}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{quantity}</Typography>
      <IconButton onClick={onClickAdd}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}

export default ItemCounter
