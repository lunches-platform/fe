import { map, cloneDeep, find, filter } from 'lodash';

import { uniqId } from '../config';

import { IProduct } from './product';

export interface ILineItem {
  id: number;
  product: IProduct;
  size: string;
  quantity: number;
}

export interface ILineItemRequestBody {
  dishId: number;
  size: string;
  quantity: number;
}

export class LineItemService {

  createLineItem(
    product: IProduct,
    size: string = 'medium',
    quantity: number = 1,
    id: number = null
  ): ILineItem {
    return {
      id: id || uniqId(),
      product: product,
      size: size,
      quantity: quantity,
    };
  }

  calcWeightFor(item: ILineItem): number {
    return item.product.sizeToWeight[item.size] * item.quantity;
  }

  createLineItemsBy(products: IProduct[]): ILineItem[] {
    return products.map(product => {
      return this.createLineItem(product);
    });
  }

  setSizeForAll(items: ILineItem[], size: string): ILineItem[] {
    return map(items, item => {
      return this.setSizeFor(item, size);
    });
  }

  setSizeFor(inputItem: ILineItem, size: string): ILineItem {
    const item = cloneDeep(inputItem);
    item.size = size;
    return item;
  }

  addItemTo(inputItems: ILineItem[], item: ILineItem): ILineItem[] {
    if (find(inputItems, ['id', item.id])) {
      return inputItems;
    }

    let items = cloneDeep(inputItems);
    items.push(item);

    return items;
  }

  removeItemFrom(inputItems: ILineItem[], item: ILineItem): ILineItem[] {
    let items = cloneDeep(inputItems);

    items = filter(items, it => it.id !== item.id);

    return items;
  }
}

