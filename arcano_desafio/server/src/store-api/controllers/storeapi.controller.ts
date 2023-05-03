import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { StoreapiService } from '../services/storeapi.service';
import { Product } from '../interfaces/storeapi.interface';

@Controller()
export class StoreController {
  constructor(private readonly storeapiService: StoreapiService) {}
  @Get('users')
  getAllUsers(): Promise<any> {
    try {
      return this.storeapiService.getAllUsers();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
  @Get('top-geo-shopping')
  getTopGeoShop(): Promise<any> {
    try {
      return this.storeapiService.getTopGeoShop();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
  @Get('users/cart/:id')
  async getUserCart(@Param('id') id: string): Promise<Product[]> {
    try {
      const userId = parseInt(id);
      const products = await this.storeapiService.getUserCart(userId);
      return products;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
