import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { match, OrderType, TransactionType } from '@tinychange/txn-matcher'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import fs from 'node:fs'
import { nanoid } from 'nanoid'

@Controller('api')
export class MatchController {
  constructor() {}

  @Post('update')
  async update(@Body() body: { [txId: string]: string }) {
    const content: { orders: OrderType[]; transactions: TransactionType[] } =
      JSON.parse(fs.readFileSync('data.json', 'utf8'))

    for (const key in body) {
      const tx = content.transactions.find((item) => item.id === key)
      tx.verifiedId = body[key]

      // todo: push new data to nlp api to train
    }

    fs.writeFile('data.json', JSON.stringify(content, null, 2), () => {})
    return true
  }

  @Get('data')
  async match() {
    const content = fs.readFileSync('data.json', 'utf8')
    return content
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'order', maxCount: 1 },
      { name: 'transaction', maxCount: 1 },
    ]),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      order: Express.Multer.File[]
      transaction: Express.Multer.File
    },
  ) {
    const orders = JSON.parse(files.order[0]?.buffer.toString())
    const transactions = JSON.parse(files.transaction[0]?.buffer.toString())

    orders.forEach((item) => {
      item.id = nanoid(5)
    })

    transactions.forEach((item) => {
      item.id = nanoid(5)
    })

    const res = await match({
      orders: orders as OrderType[],
      transactions: transactions as TransactionType[],
    })

    // todo: nlp match on unverified transactions

    fs.writeFile('data.json', JSON.stringify(res, null, 2), 'utf8', (err) => {
      console.log(err)
    })

    return true
  }
}
