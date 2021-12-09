import { AxiosResponse } from 'axios'
import initializeAxios from './axiosSetup'
import { axiosRequestConfiguration } from './config'

const baseUrl = process.env.REACT_APP_API_URI || 'http://localhost:8000'

const axiosInstance = initializeAxios(axiosRequestConfiguration)

export const apiGet = async <T>(
  url: string,
  queryParams?: object
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.get(baseUrl + url, { params: queryParams })
}

export const apiPost = async (
  url: string,
  body: object,
  queryParams?: object
) => {
  return await axiosInstance.post(baseUrl + url, body, { params: queryParams })
}

export const apiDelete = async (url: string, id: string) => {
  return await axiosInstance.delete(`${baseUrl + url}/${id}`)
}
