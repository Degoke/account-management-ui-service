import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ProvideAuth } from './context/authContext'

const queryClient = new QueryClient()

function App(): React.ReactElement {
  return (
    <ProvideAuth>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ProvideAuth>
  )
}

export default App
