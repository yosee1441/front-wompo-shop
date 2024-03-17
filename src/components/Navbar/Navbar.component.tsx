import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Link to={'/'}>
          <Typography variant="h6">WOMPO SHOP</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
