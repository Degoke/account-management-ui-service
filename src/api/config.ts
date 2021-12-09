import { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_API_URI || 'http://localhost:8000'

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
}
