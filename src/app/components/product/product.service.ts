export class Product {
  id: number;
  name: string;
  ingredients: string[];
  pricePer100: number;
  sizeToWeight: ISizeToWeight;
  type: 'garnish' | 'salad' | 'meat' | 'desert';
}

export interface ISizeToWeight {
  small: number;
  mid: number;
  big: number;
}

export class ProductService {
  constructor(private $q: ng.IQService) {
    'ngInject';
  }
}

