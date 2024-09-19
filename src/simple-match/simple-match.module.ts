import { Module } from '@nestjs/common'
import { SimpleMatchService } from './simple-match.service'
import { Validator } from './simple-match.validator'
import { SimpleMatchController } from './simple-match.controller'

@Module({
  controllers: [SimpleMatchController],
  providers: [SimpleMatchService, Validator],
})
export class SimpleMatchModule {}
