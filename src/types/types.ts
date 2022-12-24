export interface IRoutes {
    [key: string | number]: string | HTMLElement;
  }
  
  export interface keyable {
    [key: string | number]: Array<object>;
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
