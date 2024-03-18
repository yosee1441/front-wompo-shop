import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import HttpClientService from '@/services/httpClient.service'
import { Product, Purchase } from '@/models'
import { mocks } from '../mocks/data.mock'

describe('Testing in httpClientService', () => {
  let httpClient: HttpClientService
  let mockAxios: MockAdapter

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)

    httpClient = new HttpClientService()

    mockAxios
      .onGet('http://localhost:3000/api/product')
      .reply(200, mocks.products)
    mockAxios
      .onGet(
        'http://localhost:3000/api/product/mens_chill_crew_neck_sweatshirt',
      )
      .reply(200, mocks.products[0])
    mockAxios
      .onPost('http://localhost:3000/api/purchase')
      .reply(201, mocks.purchases)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('Should return find all products', async () => {
    const response = await httpClient.get<Product[]>('product')
    expect(response.length).toBeGreaterThan(0)
  })

  it('Should return find one product', async () => {
    const response = await httpClient.get<Product>(
      `product/mens_chill_crew_neck_sweatshirt`,
    )
    expect(response.title).toEqual('Men’s Chill Crew Neck Sweatshirt')
  })

  it('Should create one purchase', async () => {
    const response = await httpClient.post<Purchase>(`purchase`, {
      productId: 'mens_chill_crew_neck_sweatshirt',
      cardNumber: '5254133674403564',
      name: 'Mauricio Flor',
      expirationDate: '11/25',
      cvv: '123',
      documentNumber: '1234567891',
      prise: 75,
      typeDocument: 'CC',
    })
    expect(response.productId).toEqual('mens_chill_crew_neck_sweatshirt')
  })
})
