import {map, cloneDeep} from 'lodash';

import {uniqId} from '../../config';

import {IProduct} from './product';

export interface ILineItem {
  id: number;
  product: IProduct;
  size: string;
  quantity: number;
}

export interface ILineItemRequestBody {
  productId: number;
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

  calcPriceFor(item: ILineItem): number {
    return item.product.price / 100 * this.calcWeightFor(item);
  }

  calcPriceForAll(items: ILineItem[]): number {
    return items.reduce((sum, item) => {
      return sum + this.calcPriceFor(item);
    }, 0);
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
}
