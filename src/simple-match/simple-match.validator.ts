import { Injectable } from '@nestjs/common'
import { InferType, number, object, string } from 'yup'

const orderId = string().required()
const customerName = string().required()
const date = string().required()
const product = string().required()
const price = number().required()

const orderSchema = object({
  type: string().oneOf(['order'] as const),
  customerName,
  orderId,
  date,
  product,
  price,
})

const txnSchema = object({
  type: string().oneOf(['txn'] as const),
  customerName,
  orderId,
  date,
  product,
  price,
  transactionType: string().required(),
  transactionDate: string().required(),
  transactionAmount: number().required(),
})

export type OrderType = InferType<typeof orderSchema>
export type TransactionType = InferType<typeof txnSchema>

@Injectable()
export class Validator {
  validateOrder(order: OrderType) {
    return orderSchema.validate(order, { stripUnknown: true })
  }

  validateTxn(txn: TransactionType) {
    return txnSchema.validate(txn, { stripUnknown: true })
  }
}
