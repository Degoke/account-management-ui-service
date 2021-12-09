import { User } from './user'

export interface Transaction {
  sender: User
  receiver: User
  amount: number
  createdAt: string
  _id: string
}
