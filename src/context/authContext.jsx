/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useState } from 'react'
import { getWithExpiry } from '../utils/localStorage'
import constants from '../utils/constants'

export const authContext = createContext()

export function ProvideAuth({ children }) {
  const [details, setDetails] = useState(false)
  const checkAuth = () => {
    const token = getWithExpiry(constants.token)
    return token ? true : false
  }

  return (
    <authContext.Provider value={{ checkAuth, details, setDetails }}>
      {children}
    </authContext.Provider>
  )
}
