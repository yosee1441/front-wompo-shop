const express = require('express')
const apiMocker = require('connect-api-mocker')
const cors = require('cors')

const PORT = process.env.PORT || 3003
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(apiMocker('/api', 'mocks/api'))

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`)
})
