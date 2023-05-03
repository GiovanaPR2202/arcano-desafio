import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { StoreapiService } from './storeapi.service';

describe('StoreapiService', () => {
  let service: StoreapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [StoreapiService],
    }).compile();

    service = module.get<StoreapiService>(StoreapiService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users with their carts and products', async () => {
      const result = await service.getAllUsers();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((user) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('firstname');
        expect(user).toHaveProperty('lastname');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('products');
        expect(Array.isArray(user.products)).toBe(true);
      });
    });

    it('should throw an error if no users or carts are found', async () => {
      jest.spyOn(service['httpService'], 'get').mockImplementation(() => {
        return {
          toPromise() {
            return Promise.resolve({ data: [] });
          },
        } as any;
      });
      await expect(service.getAllUsers()).rejects.toThrow('User not found');
    });
  });

  describe('getUserCart', () => {
    it('should return an array of products for a given user ID', async () => {
      const result = await service.getUserCart(1);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((product) => {
        expect(product).toHaveProperty('productid');
        expect(product).toHaveProperty('quantity');
      });
    });

    it('should return an empty array if the user has no products in their cart', async () => {
      jest.spyOn(service['httpService'], 'get').mockImplementation(() => {
        return {
          toPromise() {
            return Promise.resolve({ data: [] });
          },
        } as any;
      });
      const result = await service.getUserCart(1);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('getTopGeoShop', () => {
    it('should return the region with the most purchases and the products in that region', async () => {
      const result = await service.getTopGeoShop();
      expect(result).toHaveProperty('region');
      expect(result).toHaveProperty('NumberOfPurchases');
      expect(result).toHaveProperty('productsHigh');
      expect(Array.isArray(result.productsHigh)).toBe(true);
      expect(result.productsHigh.length).toBeGreaterThan(0);
      result.productsHigh.forEach((product) => {
        expect(product).toHaveProperty('ProductId');
        expect(product).toHaveProperty('quantity');
      });
    });
  });
});
