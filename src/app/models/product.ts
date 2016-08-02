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
}
