import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Client, Cart, Product } from '../interfaces/storeapi.interface';
@Injectable()
export class StoreapiService {
  constructor(private readonly httpService: HttpService) {}

  async getAllUsers(): Promise<any> {
    const userPromise = this.httpService.get<Client[]>(
      'https://fakestoreapi.com/users',
    );
    const cartPromise = this.httpService.get<Cart[]>(
      'https://fakestoreapi.com/carts',
    );
    const [users, carts] = await Promise.all([
      lastValueFrom(userPromise),
      lastValueFrom(cartPromise),
    ]);

    const filteredCartsResponse = carts.data.filter(
      (cart) => cart.products.length > 0,
    );
    const userInfo = users.data.map((user) => ({
      id: user.id,
      firstname: user.name.firstname,
      lastname: user.name.lastname,
      email: user.email,
      products: [],
    }));

    if (!userInfo && !filteredCartsResponse) {
      throw new Error('User not found');
    }
    const usersWithCarts = userInfo.map((user) => {
      const userCarts = filteredCartsResponse.filter(
        (cart) => cart.userId === user.id,
      );

      user.products = userCarts.reduce((acc: Product[], cart) => {
        acc.push(...cart.products);
        return acc;
      }, []);

      return user;
    });

    return usersWithCarts;
  }
  async getUserCart(userId: number): Promise<Product[]> {
    const cartPromise = this.httpService.get<Cart[]>(
      'https://fakestoreapi.com/carts',
    );
    const carts = await lastValueFrom(cartPromise);
    const filteredCartsResponse = carts.data.filter(
      (cart) => cart.userId === userId && cart.products.length > 0,
    );
    const products = filteredCartsResponse.reduce((acc: Product[], cart) => {
      acc.push(...cart.products);
      return acc;
    }, []);
    return products;
  }
  async getTopGeoShop(): Promise<any> {
    const userGeo = this.httpService.get<Client[]>(
      'https://fakestoreapi.com/users',
    );
    const cartGeo = this.httpService.get<Cart[]>(
      'https://fakestoreapi.com/carts',
    );
    const [users, carts] = await Promise.all([
      lastValueFrom(userGeo),
      lastValueFrom(cartGeo),
    ]);
    const userInfo = users.data.map((user) => ({
      id: user.id,
      address: user.address,
    }));

    const cartInfo = carts.data.map((cart) => ({
      id: cart.id,
      userid: cart.userId,
      product: cart.products,
    }));
    const regionsWithPurchases = cartInfo.reduce((acc, curr) => {
      const user = userInfo.find((info) => info.id === curr.userid);
      if (user) {
        const region = user.address.city;
        if (!acc[region]) {
          acc[region] = 0;
        }
        acc[region]++;
      }
      return acc;
    }, {} as Record<string, number>);

    const highestRegion = Object.entries(regionsWithPurchases).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    );

    const productsInHighestRegion = cartInfo
      .filter(
        (cart) =>
          userInfo.find((user) => user.id === cart.userid)?.address.city ===
          highestRegion[0],
      )
      .map((cart) => cart.product)
      .flat();
    if (!productsInHighestRegion) {
      throw new Error('Product not found');
    }

    return {
      region: highestRegion[0],
      NumberOfPurchases: highestRegion[1],
      productsHigh: productsInHighestRegion,
      regions: regionsWithPurchases,
    };
  }
}
