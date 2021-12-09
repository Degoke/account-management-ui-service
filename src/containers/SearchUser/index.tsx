import React, { useState, useEffect } from 'react'
import { Paper, TextField, ListItem, ListItemText, List } from '@mui/material'
import { useQuery } from 'react-query'
import { apiGet } from '../../api/api'
import Spinner from '../../components/Spinner'
import { User } from '../../types/user'

type ReturnType = {
  message: string
  user: User
}

const SearchUser = () => {
  const [paymentId, setPaymentId] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { isLoading, isError, data, isSuccess } = useQuery(
    'userById',
    () => apiGet<ReturnType>(`/users/search/${paymentId}`),
    {
      enabled: paymentId.length === 7,
    }
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
      <Paper>
        <TextField
          type="search"
          label="search a user by payment id"
          placeholder="Enter PaymentId"
          onChange={(e) => setPaymentId(e.target.value)}
          error={!!error}
          helperText={error}
        />
        {isLoading && <Spinner />}
        {isError && <p>User Not Found</p>}
        {isSuccess && (
          <Paper>
            <List>
              <ListItem>
                <ListItemText>{data?.data.user.name}</ListItemText>
              </ListItem>
            </List>
          </Paper>
        )}
      </Paper>
    </div>
  )
}

export default SearchUser
