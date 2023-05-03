import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from '../controllers/storeapi.controller';
import { StoreapiService } from '../services/storeapi.service';

describe('StoreController', () => {
  let controller: StoreController;
  let storeapiService: StoreapiService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreapiService],
    }).compile();

    controller = module.get<StoreController>(StoreController);
    storeapiService = module.get<StoreapiService>(StoreapiService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: { firstname: 'Joe', lastname: 'Doe' },
          products: [{ ProductId: 1, quantity: 3 }],
        },
        {
          id: 1,
          name: { firstname: 'Joe', lastname: 'Doe' },
          products: [{ ProductId: 1, quantity: 3 }],
        },
      ];
      jest.spyOn(storeapiService, 'getAllUsers').mockResolvedValue(users);

      expect(await controller.getAllUsers()).toEqual(users);
    });

    it('should throw an HttpException if the service throws an error', async () => {
      jest
        .spyOn(storeapiService, 'getAllUsers')
        .mockRejectedValue(new Error('Service error'));

      await expect(controller.getAllUsers()).rejects.toThrowError(
        'Service error',
      );
    });
  });

  describe('getTopGeoShop', () => {
    it('should return an object with information about the highest purchasing region', async () => {
      const topGeoShop = {
        region: 'New York',
        NumberOfPurchases: 10,
        productsHigh: [
          {
            productId: 1,
            quantity: 4,
          },
          {
            productId: 2,
            quantity: 1,
          },
        ],
      };
      jest
        .spyOn(storeapiService, 'getTopGeoShop')
        .mockResolvedValue(topGeoShop);

      expect(await controller.getTopGeoShop()).toEqual(topGeoShop);
    });

    it('should throw an HttpException if the service throws an error', async () => {
      jest
        .spyOn(storeapiService, 'getTopGeoShop')
        .mockRejectedValue(new Error('Service error'));

      await expect(controller.getTopGeoShop()).rejects.toThrowError(
        'Service error',
      );
    });
  });

  describe('getUserCart', () => {
    it('should return an array of products for the given user', async () => {
      const products = [
        {
          productId: 1,
          quantity: 4,
        },
        {
          productId: 2,
          quantity: 1,
        },
      ];
      jest.spyOn(storeapiService, 'getUserCart').mockResolvedValue(products);

      expect(await controller.getUserCart('1')).toEqual(products);
    });

    it('should throw an HttpException if the service throws an error', async () => {
      jest
        .spyOn(storeapiService, 'getUserCart')
        .mockRejectedValue(new Error('Service error'));

      await expect(controller.getUserCart('1')).rejects.toThrowError(
        'Service error',
      );
    });
  });
});
