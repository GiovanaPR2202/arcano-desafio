import { Module } from '@nestjs/common';
import { StoreapiModule } from './store-api/storeapi/storeapi.module';

@Module({
  imports: [StoreapiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
