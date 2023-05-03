import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StoreapiService } from './services/storeapi.service';
import { StoreController } from './controllers/storeapi.controller';

@Module({
  imports: [HttpModule],
  controllers: [StoreController],
  providers: [StoreapiService],
})
export class StoreapiModule {}
