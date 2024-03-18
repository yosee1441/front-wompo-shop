import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpClient } from '@/models/httpClient.model'
import { VITE_API_URL } from '@/env'

class httpClientService implements HttpClient {
  private readonly axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${VITE_API_URL}api`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
      ...config,
    })
    return response.data as T
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, {
      ...config,
    })
    return response.data as T
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      {
        ...config,
      },
    )
    return response.data as T
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, {
      ...config,
    })
    return response.data as T
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      {
        ...config,
      },
    )
    return response.data as T
  }
}

export default httpClientService
