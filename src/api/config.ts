import { AxiosRequestConfig } from 'axios'

const baseURL = 'http://localhost:8000'

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
}
