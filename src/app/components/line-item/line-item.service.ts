import {ISize} from '../size-selector/size-selector.component';
import {Moment} from 'moment';
import {uniqueId, clone} from 'lodash';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public ingredients: string[],
    public sizeToWeight: ISizeToWeight
  ) {

  }
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
    return item.product.price / 100 * this.calcWeightFor(item);
  }

  calcPriceForAll(items: LineItem[]): number {
    return items.reduce((sum, item) => {
      return sum + this.calcPriceFor(item);
    }, 0);
  }

  setChecked(_item: LineItem, checked: boolean) {
    let item = clone(_item);
    item.checked = checked;
    return item;
  }
}

