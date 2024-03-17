const { makeApiRequest } = require('../../utils/util')
const { purchases } = require('../../data.json')

const CARD_NUMBER_VISA = '4013540682746260'

module.exports = (request, response) => {
  if(request.body.cardNumber === CARD_NUMBER_VISA){
    return makeApiRequest().then(() => {
      return response.status(403).json({})
    })
  }
  return makeApiRequest().then(() => {
    return response.status(201).json(purchases[0])
  })
}
