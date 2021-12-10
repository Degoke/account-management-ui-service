import React from 'react'
import SearchUser from '../SearchUser'
import SendTransaction from '../SendTransactions'
import { Stack } from '@mui/material'

const DashboardTransactions = () => {
  return (
    <>
      <h1>Transactions</h1>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <SearchUser />
        <SendTransaction />
      </Stack>
    </>
  )
}

export default DashboardTransactions
