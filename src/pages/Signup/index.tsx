import { Button, TextField } from '@mui/material'
import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { apiPost } from '../../api/api'
import Spinner from '../../components/Spinner'

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
  const mutation = useMutation((newUser: object) => {
    return apiPost('/users', newUser)
  })

  const { isLoading, isError, isSuccess, error, mutate, data } = mutation

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

  if (isLoading) {
    console.log('loading')
  }

  if (isError) {
    console.log(error)
  }

  if (isSuccess) {
    console.log(data)
  }

  const { handleSubmit, values, handleChange, touched, errors, handleBlur } =
    formik
  const { name, email, password, phoneNumber } = values
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      </form>
      <p>
        Already have an Account <a>Signin</a>
      </p>
    </div>
  )
}

export default Signup
