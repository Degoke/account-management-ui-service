import { Button, TextField } from '@mui/material'
import React, { useContext } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { apiPost } from '../../api/api'
import Spinner from '../../components/Spinner'
import { Snackbar, Alert } from '@mui/material'
import { authContext } from '../../context/authContext'

const validationSchema = yup.object().shape({
  receiversPaymentId: yup.string().required('Payment is required'),
  amount: yup.number().positive().integer().required('Amount is Required'),
})

const SendTransaction: React.FC = () => {
  const { details, setDetails } = useContext(authContext)
  const mutation = useMutation(
    (sendTransaction: object) => {
      return apiPost('/transactions/send', sendTransaction)
    },
    {
      onSuccess: () => {
        setDetails(!details)
      },
    }
  )

  const { isLoading, isError, mutate, isSuccess } = mutation

  const formik = useFormik({
    validationSchema,
    initialValues: {
      receiversPaymentId: '',
      amount: 0,
    },
    onSubmit: (values) => {
      mutate(values)
    },
  })

  const { handleSubmit, values, handleChange, touched, errors, handleBlur } =
    formik
  const { receiversPaymentId, amount } = values
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
      {isSuccess && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success">Transfer Successful</Alert>
        </Snackbar>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="PaymentId"
          name="receiversPaymentId"
          value={receiversPaymentId}
          onChange={handleChange}
          error={!!errors.receiversPaymentId && !!touched.receiversPaymentId}
          helperText={errors.receiversPaymentId}
          onBlur={handleBlur}
          required
        />
        <TextField
          type="number"
          label="Amount"
          name="amount"
          value={amount}
          onChange={handleChange}
          error={!!errors.amount && !!touched.amount}
          helperText={errors.amount}
          onBlur={handleBlur}
          required
        />

        <Button type="submit" variant="contained" size="large">
          {isLoading ? <Spinner /> : 'Send'}
        </Button>
      </form>
    </div>
  )
}

export default SendTransaction
