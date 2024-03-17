const { makeApiRequest } = require('../../../utils/util')
const { purchases, products } = require('../../../data.json')

module.exports = (request, response) => {
  const { id } = request.params
  const findedPurchase = purchases.find((purchase) => purchase.id === +id)
  const findedProduct = products.find(
    (product) => product.slug === findedPurchase?.productId,
  )

  if (!findedPurchase) {
    return makeApiRequest().then(() => {
      return response.status(404).json()
    })
  }

  return makeApiRequest().then(() => {
    return response
      .status(200)
      .json({ ...findedPurchase, product: findedProduct })
  })
}
