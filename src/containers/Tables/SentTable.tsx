import React from 'react'
import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from '@mui/material'
import { Transaction } from '../../types/transaction'

type Props = {
  transactions: Transaction[]
}

const SentTable: React.FC<Props> = ({ transactions }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Sent To</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction?._id}>
                <TableCell>
                  {new Date(transaction?.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{transaction?.receiver.name}</TableCell>
                <TableCell>₦{transaction?.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SentTable
