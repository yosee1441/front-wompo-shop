import Container from '@mui/material/Container'
import { Title } from '@/components/Title'
import { Products } from '@/components/Products'

function Home() {
  return (
    <Container>
      <Title title={'Tienda'} subtitle={'Todos los productos'} />
      <Products />
    </Container>
  )
}

export default Home
