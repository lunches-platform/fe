import {ISize} from '../size-selector/size-selector.component';
import {uniqueId, cloneDeep} from 'lodash';

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
  medium: number;
  big: number;
}

export class LineItem {
  constructor(
    public product: Product,
    public size: ISize = {id: 'medium', title: 'Medium'},
    public quantity: number = 1,
    public checked: boolean = true,
    public id: string = null
  ) {
    this.id = this.id || uniqueId();
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
    let item = cloneDeep(_item);
    item.checked = checked;
    return item;
  }

  // todo: remove when we migrate to simple js objects
  createItemFrom(itemJson) {
    return new LineItem(
      this.createProductFrom(itemJson.product),
      itemJson.size,
      itemJson.quantity,
      itemJson.checked,
      itemJson.id
    );
  }

  // todo: remove when we migrate to simple js objects
  createProductFrom(productJson) {
    return new Product(
      productJson.id,
      productJson.name,
      productJson.price,
      productJson.ingredients,
      productJson.sizeToWeight
    );
  }
}

