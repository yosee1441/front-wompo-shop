const { makeApiRequest } = require('../../../utils/util')
const { products } = require('../../../data.json')


module.exports = (request, response) => {
  const { slug } = request.params
  const findedProduct = products.find((product) => product.slug === slug)

  if (!findedProduct) {
    return makeApiRequest().then(() => {
      return response.status(404).json({
        data: null,
      })
    })
  }

  return makeApiRequest().then(() => {
    return response.status(200).json(findedProduct)
  })
}
