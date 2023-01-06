export interface IRoutes {
  [key: string | number]: string | HTMLElement;
}

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ICategory {
  limit: number;
  products: Array<IProduct>;
  skip: number;
  total: number;
}

export interface IQuery {
  [key: string]: string;
}

export interface ICartItem {
  id: number;
  price: number;
  stock: number;
}

export enum EPromoCodes {
  RS = 'Rolling Scopes School - 10%',
  EPM = 'EPAM Systems - 10%',
}
