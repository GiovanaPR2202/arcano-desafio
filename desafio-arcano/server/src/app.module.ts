import { Module } from '@nestjs/common';
import { StoreapiModule } from './store-api/storeapi.module';

@Module({
  imports: [StoreapiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
