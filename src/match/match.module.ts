import { Module } from '@nestjs/common'
import { MatchController } from './match.controller'

@Module({
  controllers: [MatchController],
  providers: [],
})
export class MatchModule {}
