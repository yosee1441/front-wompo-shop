import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { httpReponseAdapter } from '@/adapters'
import { Http } from '@/models/http.model'
import { VITE_API_URL } from '@/env'
import { snackbarUtilities } from '@/utils/snackbarManager'
import { isInRange } from '@/utils/helpers'
import { getValidationError } from '@/utils/catalogError.util'

class HttpService implements Http {
  private readonly axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${VITE_API_URL}/api`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => ({
        ...response,
        data: httpReponseAdapter(response.data),
      }),
      (error) => {
        if (isInRange(error?.response?.status, 401, 422)) {
          const message = getValidationError(error.response.status)
          message && snackbarUtilities.error(message)
        }
        if (isInRange(error?.response?.status, 500, 599)) {
          const message = getValidationError(error.response.status)
          message && snackbarUtilities.error(message)
        }
        return Promise.reject(error)
      },
    )
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
    data?: any,
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

export default HttpService
