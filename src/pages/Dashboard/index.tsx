import React, { useState, useContext, useEffect } from 'react'
import {
  Toolbar,
  Drawer,
  Divider,
  MenuList,
  MenuItem,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material'
import styles from './style.module.css'
import { useQuery } from 'react-query'
import { apiGet } from '../../api/api'
import { User } from '../../types/user'
import { Transaction } from '../../types/transaction'
import DashboardOverview from '../../containers/DashboardOverview'
import DashboardTransactions from '../../containers/DashboardTransactions'
import constants from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/authContext'

type TransactionReturnType = {
  message: string
  transactions: Transaction[]
}

const Dashboard = () => {
  const { details, checkAuth } = useContext(authContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!checkAuth()) {
      navigate('/login')
    }
  }, [])
  const { isError: errorUser, data: user } = useQuery(['user', details], () =>
    apiGet<User>('/users/user')
  )

  const { isError: errorSentTransactions, data: sentTransactions } = useQuery(
    ['sentTransactions', details],
    () => apiGet<TransactionReturnType>('/transactions/user/sent')
  )

  const { isError: errorReceivedTransactions, data: receivedTransactions } =
    useQuery(['receivedTransactions', details], () =>
      apiGet<TransactionReturnType>('/transactions/user/received')
    )

  const [page, setPage] = useState<'overview' | 'transactions'>('overview')

  const logout = () => {
    localStorage.removeItem(constants.token)
    navigate('/')
  }

  return (
    <div>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{ '& .MuiDrawer-paper': { width: '15vw' } }}
      >
        <Toolbar />
        <Divider />
        <MenuList>
          <MenuItem onClick={() => setPage('overview')}>
            <ListItemText>Overview</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setPage('transactions')}>
            <ListItemText>Transactions</ListItemText>
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Drawer>
      <div className={styles.content}>
        <Toolbar />
        <main>
          {(errorUser ||
            errorSentTransactions ||
            errorReceivedTransactions) && (
            <Snackbar
              open={true}
              autoHideDuration={5000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="error">
                There appears to be trouble with your network retrying...
              </Alert>
            </Snackbar>
          )}
          {page === 'overview' && (
            <DashboardOverview
              user={user?.data}
              receivedTransactions={receivedTransactions?.data.transactions}
              sentTransactions={sentTransactions?.data.transactions}
            />
          )}
          {page === 'transactions' && <DashboardTransactions />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
