import {uniqueId} from 'lodash';

import {ISize} from '../size-selector/size-selector.component';
import {IProduct} from '../../models/product';

export interface ILineItem {
  id: string;
  product: IProduct;
  size: ISize;
  quantity: number;
}

export class ILineItemRequestBody {
  productId: number;
  size: string;
  quantity: number;
}

export class LineItemService {
  createLineItem(
    product: IProduct,
    size: ISize = {id: 'medium', title: 'Medium'},
    quantity: number = 1,
    id: string = null
  ): ILineItem {
    return {
      id: id || uniqueId(),
      product: product,
      size: size,
      quantity: quantity,
    };
  }

  calcWeightFor(item: ILineItem): number {
    return item.product.sizeToWeight[item.size.id] * item.quantity;
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

