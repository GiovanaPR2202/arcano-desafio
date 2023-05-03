import { Product } from './storeapi.interface';

export interface ClientInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  products: Product[];
}
