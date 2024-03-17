import { InputAdornment } from '@mui/material'
import { MastercardIcon } from '@/components/Icons'

function Mastercard() {
  return (
    <InputAdornment position="start">
      <MastercardIcon fontSize="large" />
    </InputAdornment>
  )
}

export default Mastercard
