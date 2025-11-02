import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// Types for proxy methods
type ApiProxyMethod = <T = any>(
  path: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse<T>>

const createProxyRequest = (method: string): ApiProxyMethod => {
  return async <T = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return await axios.request({
      ...config,
      method,
      url: '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers
      },
      params: { path, ...config?.params },
      data
    })
  }
}

// Interface for the apiProxy object
interface ApiProxy {
  get: ApiProxyMethod
  post: ApiProxyMethod
  put: ApiProxyMethod
  patch: ApiProxyMethod
  delete: ApiProxyMethod
}

// Convenience methods to use the proxy
export const apiProxy: ApiProxy = {
  get: createProxyRequest('GET'),
  post: createProxyRequest('POST'),
  put: createProxyRequest('PUT'),
  patch: createProxyRequest('PATCH'),
  delete: createProxyRequest('DELETE')
}
