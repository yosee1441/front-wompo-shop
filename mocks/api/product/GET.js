const { makeApiRequest } = require('../../utils/util')
const { products } = require('../../data.json')

const mockSuccess = {
  statusCode: 200,
  data: products,
}

module.exports = (request, response) => {
  return makeApiRequest().then(() => {
    return response.status(mockSuccess.statusCode).json(mockSuccess.data)
  })
}
