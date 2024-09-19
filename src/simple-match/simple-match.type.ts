import { OrderType, TransactionType } from './simple-match.validator'

export type HashTable = Record<string, Array<OrderType | TransactionType>>
