export interface ISizeToWeight {
  medium: number;
  big: number;
}

export interface IImage {
  url: string;
  isCover: boolean;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  sizeToWeight: ISizeToWeight;
  images: IImage[];
  type: string;
}

export class ProductType {
  public static get FISH(): string { return 'fish'; }
  public static get MEAT(): string { return 'meat'; }
  public static get GARNISH(): string { return 'garnish'; }
  public static get SALAD(): string { return 'salad'; }
}

interface IProductTypeUrls {
  [key: string]: string;
}

export const ProductTypeUrls: IProductTypeUrls = {
  // fish: 'http://res.cloudinary.com/df0ff62zx/image/upload/v1470304194/b1oqor4s8k0tu4ob0clz.png',
  meat: 'http://res.cloudinary.com/df0ff62zx/image/upload/v1470304194/b1oqor4s8k0tu4ob0clz.png',
  garnish: 'http://res.cloudinary.com/df0ff62zx/image/upload/v1470304241/mnpuyr0zraqkycykmjmp.png',
  salad: 'http://res.cloudinary.com/df0ff62zx/image/upload/v1470304273/clfnd8bwferavkuijfzz.png'
};

export const productTypes = Object.keys(ProductTypeUrls);
