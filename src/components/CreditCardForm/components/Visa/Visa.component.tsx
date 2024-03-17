import { InputAdornment } from '@mui/material'
import { VisaIcon } from '@/components/Icons'

function Visa() {
  return (
    <InputAdornment position="start">
      <VisaIcon fontSize="large" />
    </InputAdornment>
  )
}

export default Visa
