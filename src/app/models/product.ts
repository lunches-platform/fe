export interface ISizeToWeight {
  medium: number;
  big: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  sizeToWeight: ISizeToWeight;
}

