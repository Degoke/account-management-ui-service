import React, { useState, useEffect } from 'react'
import {
  Paper,
  TextField,
  ListItem,
  ListItemText,
  List,
  Button,
  Stack,
} from '@mui/material'
import { useMutation } from 'react-query'
import { apiGet } from '../../api/api'
import Spinner from '../../components/Spinner'
import { User } from '../../types/user'

const SearchUser = () => {
  const [paymentId, setPaymentId] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { isLoading, isError, data, isSuccess, mutate } = useMutation(
    (id: string) => apiGet<User>(`/users/search/${id}`)
  )

  useEffect(() => {
    if (paymentId.length !== 7) {
      setError('Payment id should be 7 digits')
    } else {
      setError('')
    }
  }, [paymentId])

  return (
    <div>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack spacing={2}>
          <h2>Search for a user by payment Id</h2>
          <TextField
            type="search"
            label="search a user by payment id"
            placeholder="Enter PaymentId"
            onChange={(e) => setPaymentId(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            onClick={() => mutate(paymentId)}
            disabled={paymentId.length !== 7}
            variant="contained"
          >
            Search
          </Button>
          {isLoading && <Spinner />}
          {isError && <p>User Not Found</p>}
          {isSuccess && (
            <Paper elevation={3} sx={{ p: 2 }}>
              <List>
                <ListItem>
                  <ListItemText>{data?.data.name}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>{data?.data.email}</ListItemText>
                </ListItem>
              </List>
            </Paper>
          )}
        </Stack>
      </Paper>
    </div>
  )
}

export default SearchUser
