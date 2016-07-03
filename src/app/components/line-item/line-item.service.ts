import {ISize} from '../size-selector/size-selector.component';
import {Moment} from 'moment';
import {uniqueId} from 'lodash';

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
  medium: number;
  big: number;
}

export class LineItem {
  id: string;

  constructor(
    public product: Product,
    public date: Moment,
    public size: ISize = {id: 'medium', title: 'Medium'},
    public quantity: number = 1,
    public checked: boolean = true
  ) {
    this.id = uniqueId();
  }
}

export class LineItemService {
  calcWeightFor(item: LineItem): number {
    return item.product.sizeToWeight[item.size.id] * item.quantity;
  }

  calcPriceFor(item: LineItem): number {
    return item.product.pricePer100 / 100 * this.calcWeightFor(item);
  }

  calcPriceForAll(items: LineItem[]): number {
    return items.reduce((sum, item) => {
      return sum + this.calcPriceFor(item);
    }, 0);
  }
}

