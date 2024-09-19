import { Controller, Get } from '@nestjs/common'
import { SimpleMatchService } from './simple-match.service'
import { orders, transactions } from './test-data'

@Controller('/match')
export class SimpleMatchController {
  constructor(private service: SimpleMatchService) {}

  @Get()
  match() {
    return this.service.match({
      orders: orders,
      transactions: transactions,
    })
  }
}
