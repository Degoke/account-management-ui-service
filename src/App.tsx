import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { authContext } from './context/authContext'

const queryClient = new QueryClient()

function App(): React.ReactElement {
  const { checkAuth } = useContext(authContext)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              checkAuth() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/register"
            element={checkAuth() ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route
            path="/login"
            element={checkAuth() ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={checkAuth() ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
