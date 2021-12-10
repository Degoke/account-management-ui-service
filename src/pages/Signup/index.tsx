import { Button, TextField, Container, Paper, Stack } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { apiPost } from '../../api/api'
import Spinner from '../../components/Spinner'
import { authContext } from '../../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Should be a valid Email Address')
    .required('Email is required'),
  password: yup.string().required('Password is Required'),
  phoneNumber: yup.string().required('Phone Number is Required'),
})

const Signup: React.FC = () => {
  const { checkAuth } = useContext(authContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (checkAuth()) {
      navigate('/dashboard')
    }
  }, [])
  const mutation = useMutation(
    (newUser: object) => {
      return apiPost('/users', newUser)
    },
    {
      onSuccess: () => {
        navigate('/login')
      },
    }
  )

  const { isLoading, isError, mutate } = mutation

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    onSubmit: (values) => {
      console.log(values)
      mutate(values)
    },
  })

  const { handleSubmit, values, handleChange, touched, errors, handleBlur } =
    formik
  const { name, email, password, phoneNumber } = values
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
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="text"
                label="Name"
                name="name"
                value={name}
                onChange={handleChange}
                error={!!errors.name && !!touched.name}
                helperText={errors.name}
                onBlur={handleBlur}
                required
              />
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
                type="string"
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber && !!touched.phoneNumber}
                helperText={errors.phoneNumber}
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
                {isLoading ? <Spinner /> : 'Signup'}
              </Button>
            </Stack>
          </form>
          <p>
            Already have an Account <Link to="/login">SIGN iN</Link>
          </p>
        </Paper>
      </Container>
    </div>
  )
}

export default Signup
