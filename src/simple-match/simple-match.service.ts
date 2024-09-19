import { Injectable } from '@nestjs/common'
import { OrderType, TransactionType, Validator } from './simple-match.validator'
import { createHash } from 'crypto'
import { HashTable } from './simple-match.type'

@Injectable()
export class SimpleMatchService {
  constructor(private validator: Validator) {}

  async match({
    orders,
    transactions,
  }: {
    orders: OrderType[]
    transactions: TransactionType[]
  }) {
    // validate data
    const hashedTable = this.buildHashTable(orders)

    // add transaction to hashedtable
    for (let i = 0; i < transactions.length; i++) {
      const hashedKey = this.getHashedhKey(transactions[i])
      if (hashedTable[hashedKey]) {
        hashedTable[hashedKey].push(transactions[i])
      }
    }

    return Object.values(hashedTable)
  }

  buildHashTable(orders: OrderType[]) {
    const table: HashTable = {}
    for (let i = 0; i < orders.length; i++) {
      const hashedKey = this.getHashedhKey(orders[i])
      table[hashedKey] = [orders[i]]
    }
    return table
  }

  getHashedhKey(order: OrderType | TransactionType) {
    const { customerName, orderId, date, price } = order
    const hashedKey = createHash('md5')
      .update(
        JSON.stringify([
          customerName.toLowerCase().trim(),
          String(orderId),
          date,
          price,
        ]),
      )
      .digest('hex')

    return hashedKey
  }
}
