import { Button, TextField, Container, Paper, Stack } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { apiPost } from '../../api/api'
import Spinner from '../../components/Spinner'
import { useNavigate, Link } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
import constants from '../../utils/constants'
import { setWithExpiry } from '../../utils/localStorage'
import { authContext } from '../../context/authContext'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Should be a valid Email Address')
    .required('Email is required'),
  password: yup.string().required('Password is Required'),
})

const Login: React.FC = () => {
  const { checkAuth } = useContext(authContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (checkAuth()) {
      navigate('/dashboard')
    }
  }, [])
  const mutation = useMutation(
    (loginUser: object) => {
      return apiPost('/auth/login', loginUser)
    },
    {
      onSuccess: (data) => {
        setWithExpiry(constants.token, data.data.access_token, 86400000)
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      },
    }
  )

  const { isLoading, isError, mutate } = mutation

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values)
      mutate(values)
    },
  })

  const { handleSubmit, values, handleChange, touched, errors, handleBlur } =
    formik
  const { email, password } = values
  return (
    <div>
      {isError && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error">Error</Alert>
        </Snackbar>
      )}
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2 }}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
                error={!!errors.email && !!touched.email}
                helperText={errors.email}
                onBlur={handleBlur}
                required
              />
              <TextField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={handleChange}
                error={!!errors.password && !!touched.password}
                helperText={errors.password}
                onBlur={handleBlur}
                required
              />
              <Button type="submit" variant="contained" size="large">
                {isLoading ? <Spinner /> : 'Login'}
              </Button>
            </Stack>
          </form>
          <p>
            Dont have an Account <Link to="/register">SIGN UP</Link>
          </p>
        </Paper>
      </Container>
    </div>
  )
}

export default Login
