/* eslint-disable @typescript-eslint/no-shadow */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import constants from '../utils/constants'
import { getWithExpiry } from '../utils/localStorage'

const initializeAxios = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config)

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getWithExpiry(constants.token)}`

    return config
  })

  return axiosInstance
}

export default initializeAxios
