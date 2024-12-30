import { useAppSelector } from '@/redux/hooks'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

function Navbar() {
  const { result: user } = useAppSelector((state) => state.authUser)

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Link to={'/'}>
          <Typography variant="h6">WOMPO SHOP</Typography>
          <Typography sx={{ ml: 0.5 }}>{user?.name}</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
