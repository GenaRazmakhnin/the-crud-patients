import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

async function del<T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> {
  return await axios.delete(url, config)
}

async function get<T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> {
   const { data } = await axios.get(url, config)
   return data
}

async function post(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
) {
  try {
    const response = await axios.post(url, params, config)
    return { data: response }
  } catch (error) {
    return { error }
  }
}

async function patch<T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<R> {
  return await axios.patch(url, data, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
}

const api = { get, post, del, patch }

export default api