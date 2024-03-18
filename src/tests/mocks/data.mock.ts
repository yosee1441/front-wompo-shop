export const mocks = {
  products: [
    {
      description:
        'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',
      images: ['1740176-00-A_0_2000.jpg', '1740176-00-A_1.jpg'],
      inStock: 7,
      price: 75,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'mens_chill_crew_neck_sweatshirt',
      type: 'shirts',
      tags: ['sweatshirt'],
      title: 'Men’s Chill Crew Neck Sweatshirt',
      gender: 'men',
    },
  ],
  purchases: {
    id: 1,
    productId: 'mens_chill_crew_neck_sweatshirt',
    cardNumber: '5254133674403564',
    name: 'Mauricio Flor',
    expirationDate: '11/25',
    cvv: '123',
    documentNumber: '1234567891',
    prise: 75,
    typeDocument: 'CC',
  },
}
