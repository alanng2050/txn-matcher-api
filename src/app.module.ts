import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SimpleMatchModule } from './simple-match/simple-match.module'

@Module({
  imports: [SimpleMatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
