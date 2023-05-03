import { ClientInfo } from './ClientInfo';
export interface Client {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v: number;
}
export interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
  clientinfo: ClientInfo;
}
export interface Geolocation {
  lat: string;
  long: string;
}
export interface Name {
  firstname: string;
  lastname: string;
}
export interface Cart {
  id: number;
  userId: Client['id'];
  date: string;
  products: Product[];
  __v: number;
}
export interface Product {
  productId: number;
  quantity: number;
  title?: string;
  price?: number;
  cartegory?: string;
  description?: string;
  image?: string;
  rating?: number;
}