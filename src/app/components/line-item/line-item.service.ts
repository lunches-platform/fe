import {uniqId} from '../../../config';

import {IProduct} from '../../models/product';

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

export interface ILineItemResponseBody {
  id: number;
  price: number;
  // todo: replace with IProduct
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
}

