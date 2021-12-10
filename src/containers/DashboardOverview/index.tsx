import React, { useState, useContext } from 'react'
import {
  ListItemText,
  Paper,
  List,
  ListItem,
  Button,
  Fab,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Stack,
} from '@mui/material'
import { User } from '../../types/user'
import { Transaction } from '../../types/transaction'
import ReceivedTable from '../Tables/ReceivedTable'
import SentTable from '../Tables/SentTable'
import { useMutation } from 'react-query'
import { apiDelete, apiGet } from '../../api/api'
import Spinner from '../../components/Spinner'
import { authContext } from '../../context/authContext'

type Props = {
  user: User
  receivedTransactions: Transaction[]
  sentTransactions: Transaction[]
}

const DashboardOverview: React.FC<Props> = ({
  user,
  receivedTransactions,
  sentTransactions,
}) => {
  const { details, setDetails } = useContext(authContext)

  const [table, setTable] = useState<'sent' | 'received'>('sent')
  const {
    mutate: mutateDelete,
    isLoading: loadingDelete,
    isError,
    isSuccess,
  } = useMutation((deleteId: string) => apiDelete(`/users/delete`, deleteId), {
    onSuccess: () => {
      setDetails(!details)
    },
  })
  const {
    mutate: mutateGenerate,
    isLoading: loadingGenerate,
    isError: generateError,
    isSuccess: generateSuccess,
  } = useMutation(() => apiGet(`/users/generate-paymentid`), {
    onSuccess: () => {
      setDetails(!details)
    },
  })

  return (
    <div>
      {(isError || generateError) && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error">Error</Alert>
        </Snackbar>
      )}
      {(isSuccess || generateSuccess) && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success">Success</Alert>
        </Snackbar>
      )}
      <h1>Hello {user?.name}</h1>
      <p>Welcome to your dashboard</p>
      <Stack spacing={3}>
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <h2>Wallet Balance</h2>
            <p>₦{user?.walletBalance}</p>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <h2>Payment Ids</h2>

            <List>
              {user?.paymentId.map((id) => (
                <ListItem key={id}>
                  <Stack direction="row" spacing={4}>
                    <ListItemText>{id}</ListItemText>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => mutateDelete(id)}
                    >
                      {loadingDelete ? <Spinner /> : 'Delete'}
                    </Button>
                  </Stack>
                </ListItem>
              ))}
            </List>
            <Fab onClick={() => mutateGenerate()}>
              {loadingGenerate ? <Spinner /> : 'Add'}
            </Fab>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <h2>Personal Info</h2>

            <List>
              <ListItem>
                <ListItemText>Name: {user?.name}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Email Address: {user?.email}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Phone Number: {user?.phoneNumber}</ListItemText>
              </ListItem>
            </List>
          </Paper>
        </Stack>

        <Paper elevation={3} sx={{ p: 2 }}>
          <h2>Transaction History</h2>
          <Tabs>
            <Tab label="Sent Transactions" onClick={() => setTable('sent')} />
            <Tab
              label="Received Transactions"
              onClick={() => setTable('received')}
            />
          </Tabs>
          {table === 'sent' && <SentTable transactions={sentTransactions} />}
          {table === 'received' && (
            <ReceivedTable transactions={receivedTransactions} />
          )}
        </Paper>
      </Stack>
    </div>
  )
}

export default DashboardOverview
